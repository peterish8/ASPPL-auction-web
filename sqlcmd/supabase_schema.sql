-- Trades Table (Admin managed)
CREATE TABLE trades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_number VARCHAR(50) UNIQUE NOT NULL,
  trade_date DATE NOT NULL,
  week_id VARCHAR(20) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Pooling Locations Table (Admin managed)
CREATE TABLE pooling_locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id UUID REFERENCES trades(id),
  location_name VARCHAR(255) NOT NULL,
  collection_date DATE NOT NULL,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Dropdown Options Tables (Admin managed)
CREATE TABLE details_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  option_label VARCHAR(255) NOT NULL,
  option_value VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0
);

CREATE TABLE type_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  option_label VARCHAR(255) NOT NULL,
  option_value VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0
);

CREATE TABLE depot_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  option_label VARCHAR(255) NOT NULL,
  option_value VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0
);

-- Submissions Table
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  trade_id UUID REFERENCES trades(id),
  phone_number VARCHAR(15) NOT NULL,
  name VARCHAR(255) NOT NULL,
  details VARCHAR(255) NOT NULL,
  weight INT NOT NULL,
  type VARCHAR(255) NOT NULL,
  depot VARCHAR(255) NOT NULL,
  device_fingerprint VARCHAR(255),
  submitted_at TIMESTAMP DEFAULT NOW(),
  
  -- Ensure one submission per phone per trade
  UNIQUE(trade_id, phone_number)
);

-- Indexes for performance
CREATE INDEX idx_submissions_phone ON submissions(phone_number);
CREATE INDEX idx_submissions_trade ON submissions(trade_id);
CREATE INDEX idx_submissions_fingerprint ON submissions(device_fingerprint);

-- Seed Data (Example)
INSERT INTO trades (trade_number, trade_date, week_id, is_active) VALUES ('TR-2026-001', '2026-01-12', '2026-W02', true);

INSERT INTO pooling_locations (trade_id, location_name, collection_date, display_order) 
SELECT id, 'Adimali', '2026-01-08', 1 FROM trades WHERE trade_number = 'TR-2026-001'
UNION ALL
SELECT id, 'Vandanmedu', '2026-01-09', 2 FROM trades WHERE trade_number = 'TR-2026-001'
UNION ALL
SELECT id, 'Kumily', '2026-01-10', 3 FROM trades WHERE trade_number = 'TR-2026-001';

INSERT INTO details_options (option_label, option_value, display_order) VALUES 
('Small Cardamom', 'small_cardamom', 1),
('Large Cardamom', 'large_cardamom', 2);

INSERT INTO type_options (option_label, option_value, display_order) VALUES 
('Drier', 'drier', 1),
('Sun Dried', 'sun_dried', 2);

INSERT INTO depot_options (option_label, option_value, display_order) VALUES 
('Puttady', 'puttady', 1),
('Bodinayakkanur', 'bodinayakkanur', 2);
