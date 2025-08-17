/*
  # Add address fields and notes to customers table

  1. Changes
    - Add `notes` column for additional customer information
    - Add `address` column for street address
    - Add `city` column for city name
    - Add `state` column for state/province
    - Add `zip_code` column for postal code
    - Add `country` column for country name
    - All fields are optional (nullable) to maintain compatibility with existing data

  2. Notes
    - These fields will provide complete customer profile management
    - Existing customers will have null values for these fields initially
    - Form validation will remain optional for address fields
*/

DO $$
BEGIN
  -- Add notes field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'notes'
  ) THEN
    ALTER TABLE customers ADD COLUMN notes text;
  END IF;

  -- Add address field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'address'
  ) THEN
    ALTER TABLE customers ADD COLUMN address text;
  END IF;

  -- Add city field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'city'
  ) THEN
    ALTER TABLE customers ADD COLUMN city text;
  END IF;

  -- Add state field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'state'
  ) THEN
    ALTER TABLE customers ADD COLUMN state text;
  END IF;

  -- Add zip_code field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'zip_code'
  ) THEN
    ALTER TABLE customers ADD COLUMN zip_code text;
  END IF;

  -- Add country field if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'customers' AND column_name = 'country'
  ) THEN
    ALTER TABLE customers ADD COLUMN country text;
  END IF;
END $$;