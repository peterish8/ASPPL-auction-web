-- Drop the unique constraint that prevents multiple submissions per phone number
ALTER TABLE submissions DROP CONSTRAINT IF EXISTS submissions_trade_id_phone_number_key;

-- Note: You might need to check the actual constraint name in your database if the above specific name wasn't generated.
-- Common variations: "submissions_phone_number_trade_id_key" or similar.
-- You can find it with:
-- SELECT conname FROM pg_constraint WHERE conrelid = 'submissions'::regclass;
