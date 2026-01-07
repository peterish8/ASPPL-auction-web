# Database Schema Reference

## Tables

### 1. trades
- `id` (UUID)
- `trade_number` (Text)
- `trade_date` (Date)
- `is_active` (Boolean)
- `created_at` (Timestamp)

### 2. pooling_schedule
- `id` (UUID)
- `trade_id` (UUID/Text - Foreign Key to trades)
- `location` (Text)
- `pooling_date` (Date)
- `order_index` (Integer)
- `created_at` (Timestamp)

### 3. dropdowns
*Stores all dropdown options (Details, Type, Depot)*
- `id` (UUID)
- `category` (Text) - 'details', 'type', or 'depot'
- `label` (Text) - Display text
- `is_active` (Boolean)
- `order_index` (Integer)
- `created_at` (Timestamp)

### 4. submissions
- `id` (UUID)
- `trade_number` (Text) - Linked to trade
- `phone_number` (Text)
- `name` (Text)
- `details` (Text)
- `weight` (Integer/Number)
- `type` (Text)
- `depot` (Text)
- `device_fingerprint` (Text)
- `submitted_at` (Timestamp)
