import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductFullTextSearch1751373333514
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
-- Populate the column initially
UPDATE products SET search_vector =
to_tsvector('english',
coalesce(name, '') || ' ' ||
coalesce(description, '') || ' ' ||
coalesce(brand, '') || ' ' ||
coalesce(category, '') || ' '
);

-- Create the GIN index
CREATE INDEX idx_products_search_vector ON products USING GIN (search_vector);

-- Add the trigger function if not already present
CREATE TRIGGER trg_products_search_vector_update
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW EXECUTE FUNCTION
tsvector_update_trigger(
search_vector,
'pg_catalog.english',
name,
description,
brand,
category
);
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
DROP TRIGGER IF EXISTS trg_products_search_vector_update ON products;
DROP INDEX IF EXISTS idx_products_search_vector;
ALTER TABLE products DROP COLUMN IF EXISTS search_vector;
`);
  }
}
