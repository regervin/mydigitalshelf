/*
  # Add phone column to customers table

  1. Changes
    - Add `phone` column for customer phone numbers
    - Field is optional (nullable) to maintain compatibility with existing data

  2. Notes
    - This field will complete the basic customer contact information
    - Existing customers will have null values for this field initially
*/

DO $$
BEGIN
  -- Add phone field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'phone'
  ) THEN
    ALTER TABLE customers ADD COLUMN phone text;
  END IF;
END $$;