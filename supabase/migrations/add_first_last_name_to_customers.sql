/*
  # Add first_name and last_name fields to customers table

  1. Changes
    - Add `first_name` column for customer's first name
    - Add `last_name` column for customer's last name
    - Both fields are optional (nullable) to maintain compatibility with existing data

  2. Notes
    - These fields will allow better customer name management
    - Existing customers with only a `name` field can be updated later
    - Form will use separate first/last name inputs for better UX
*/

DO $$
BEGIN
  -- Add first_name field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE customers ADD COLUMN first_name text;
  END IF;

  -- Add last_name field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE customers ADD COLUMN last_name text;
  END IF;
END $$;
