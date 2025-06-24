/**
 * Database and Entity Types
 */

// Base entity interface
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

// Soft delete entity
export interface SoftDeleteEntity extends BaseEntity {
  isDeleted: boolean;
  deletedAt: string | null;
  deletedBy?: string | null;
}

// Auditable entity
export interface AuditableEntity extends BaseEntity {
  createdBy: string;
  updatedBy: string;
  version: number;
}

// Timestamped entity
export interface TimestampedEntity {
  createdAt: string;
  updatedAt: string;
}

// Database connection config
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  pool?: {
    min: number;
    max: number;
    idle: number;
  };
  timeout?: number;
  retries?: number;
}

// Query options
export interface QueryOptions {
  select?: string[];
  include?: string[] | Record<string, any>;
  where?: Record<string, any>;
  orderBy?: Record<string, 'asc' | 'desc'> | Record<string, 'asc' | 'desc'>[];
  skip?: number;
  take?: number;
  distinct?: string[];
}

// Transaction options
export interface TransactionOptions {
  timeout?: number;
  isolationLevel?: 'READ_UNCOMMITTED' | 'READ_COMMITTED' | 'REPEATABLE_READ' | 'SERIALIZABLE';
  deferrable?: boolean;
}

// Migration info
export interface Migration {
  id: string;
  name: string;
  batch: number;
  executedAt: string;
}

// Database operations
export type DatabaseOperation = 'CREATE' | 'READ' | 'UPDATE' | 'DELETE' | 'UPSERT';

// Relation types
export type RelationType = 'ONE_TO_ONE' | 'ONE_TO_MANY' | 'MANY_TO_ONE' | 'MANY_TO_MANY';

export interface Relation {
  type: RelationType;
  from: string;
  to: string;
  foreignKey?: string;
  references?: string;
  onDelete?: 'CASCADE' | 'SET_NULL' | 'RESTRICT' | 'NO_ACTION';
  onUpdate?: 'CASCADE' | 'SET_NULL' | 'RESTRICT' | 'NO_ACTION';
}

// Index types
export interface DatabaseIndex {
  name: string;
  fields: string[];
  unique?: boolean;
  partial?: string;
  method?: 'BTREE' | 'HASH' | 'GIN' | 'GIST';
}

// Schema definition
export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
  indexes: DatabaseIndex[];
  relations: Relation[];
  constraints: TableConstraint[];
}

export interface ColumnSchema {
  name: string;
  type: ColumnType;
  nullable?: boolean;
  default?: any;
  primaryKey?: boolean;
  unique?: boolean;
  autoIncrement?: boolean;
  length?: number;
  precision?: number;
  scale?: number;
  comment?: string;
}

export type ColumnType = 
  | 'VARCHAR'
  | 'TEXT'
  | 'INTEGER'
  | 'BIGINT'
  | 'DECIMAL'
  | 'FLOAT'
  | 'DOUBLE'
  | 'BOOLEAN'
  | 'DATE'
  | 'DATETIME'
  | 'TIMESTAMP'
  | 'TIME'
  | 'JSON'
  | 'JSONB'
  | 'UUID'
  | 'ENUM'
  | 'ARRAY';

export interface TableConstraint {
  name: string;
  type: 'PRIMARY_KEY' | 'FOREIGN_KEY' | 'UNIQUE' | 'CHECK' | 'NOT_NULL';
  columns: string[];
  references?: {
    table: string;
    columns: string[];
  };
  expression?: string;
}

// Aggregation types
export interface AggregateResult {
  count?: number;
  sum?: number;
  avg?: number;
  min?: any;
  max?: any;
}

export interface GroupByResult<T = any> {
  group: Record<string, any>;
  data: T[];
  aggregates?: AggregateResult;
}

// Database events
export interface DatabaseEvent {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  id: string;
  before?: Record<string, any>;
  after?: Record<string, any>;
  timestamp: string;
  userId?: string;
}

// Backup and restore
export interface BackupInfo {
  id: string;
  filename: string;
  size: number;
  tables: string[];
  createdAt: string;
  type: 'FULL' | 'INCREMENTAL' | 'DIFFERENTIAL';
  status: 'CREATED' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
}

export interface RestoreOptions {
  backupId: string;
  tables?: string[];
  dropExisting?: boolean;
  ignoreErrors?: boolean;
}

// Database health
export interface DatabaseHealth {
  connected: boolean;
  responseTime: number;
  activeConnections: number;
  maxConnections: number;
  version: string;
  uptime: number;
}

// Seeders
export interface SeederInfo {
  name: string;
  executed: boolean;
  executedAt?: string;
  order: number;
}

// Connection pool
export interface PoolStats {
  total: number;
  active: number;
  idle: number;
  waiting: number;
  created: number;
  destroyed: number;
  errors: number;
}

// Raw query result
export interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
  command: string;
  fields: QueryField[];
  duration: number;
}

export interface QueryField {
  name: string;
  type: string;
  nullable: boolean;
}

// Database lock
export interface DatabaseLock {
  id: string;
  name: string;
  acquired: boolean;
  acquiredAt?: string;
  expiresAt?: string;
  ownerId: string;
}
