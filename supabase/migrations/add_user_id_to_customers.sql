/*
  # Add user_id column to customers table

  1. Changes
    - Add `user_id` column to link customers to authenticated users
    - Add foreign key constraint to auth.users
    - Enable Row Level Security (RLS) on customers table
    - Add RLS policies for user data isolation

  2. Security
    - Users can only access their own customers
    - Authenticated users can perform CRUD operations on their customers
    - Unauthenticated users have no access

  3. Notes
    - This field is essential for multi-user data isolation
    - Existing customers will need user_id values assigned
*/

DO $$
BEGIN
  -- Add user_id field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE customers ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Enable RLS on customers table
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own customers" ON customers;
DROP POLICY IF EXISTS "Users can insert own customers" ON customers;
DROP POLICY IF EXISTS "Users can update own customers" ON customers;
DROP POLICY IF EXISTS "Users can delete own customers" ON customers;

-- Create RLS policies for customers
CREATE POLICY "Users can view own customers"
  ON customers
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own customers"
  ON customers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own customers"
  ON customers
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own customers"
  ON customers
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
