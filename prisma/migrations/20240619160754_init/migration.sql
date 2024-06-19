-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Search" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Search_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WeatherData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "searchId" INTEGER NOT NULL,
    "country" TEXT,
    "capital" TEXT,
    "temperature" REAL NOT NULL,
    "feelsLike" REAL NOT NULL,
    "precipitation" REAL,
    "windSpeed" REAL NOT NULL,
    "humidity" REAL NOT NULL,
    CONSTRAINT "WeatherData_searchId_fkey" FOREIGN KEY ("searchId") REFERENCES "Search" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "WeatherData_searchId_key" ON "WeatherData"("searchId");
