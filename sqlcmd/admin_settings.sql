-- Create a table for global admin settings
CREATE TABLE IF NOT EXISTS admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Insert the default next opening date setting
INSERT INTO admin_settings (key, value, description)
VALUES ('next_opening_date', '2026-01-20', 'The date when the next trade booking opens')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Allow public read access (so everyone can see the date)
CREATE POLICY "Public can view settings" 
ON admin_settings FOR SELECT 
USING (true);

-- Allow authenticated users (admins) to modify settings
CREATE POLICY "Admins can manage settings" 
ON admin_settings FOR ALL 
USING (auth.role() = 'authenticated');
