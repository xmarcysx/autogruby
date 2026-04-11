-- Migration: add subject column to inquiries table
-- Run this in Supabase SQL editor

ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS subject text;

-- Index to speed up admin list (new first, then by date)
CREATE INDEX IF NOT EXISTS inquiries_status_created_idx
  ON inquiries (status, created_at DESC);
