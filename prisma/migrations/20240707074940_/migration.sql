-- CreateTable
CREATE TABLE "Preference" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Storage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "InventoryEntry" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "scryfallId" TEXT NOT NULL,
    "oracleId" TEXT NOT NULL,
    "treatment" TEXT NOT NULL,
    "storageId" INTEGER,
    "qty" INTEGER NOT NULL,
    CONSTRAINT "InventoryEntry_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "StorageRule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comparisonField" TEXT NOT NULL,
    "comparisonOperator" TEXT NOT NULL,
    "comparisonValue" TEXT NOT NULL,
    "storageId" INTEGER NOT NULL,
    CONSTRAINT "StorageRule_storageId_fkey" FOREIGN KEY ("storageId") REFERENCES "Storage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Preference_key_key" ON "Preference"("key");
