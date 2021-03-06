DROP DATABASE IF EXISTS library_management;
CREATE DATABASE library_management;
USE library_management;
DROP TABLE IF EXISTS Item;
DROP TABLE IF EXISTS ItemLog;
DROP TABLE IF EXISTS ItemType;

CREATE TABLE tbl_Item(
  ItemID            INTEGER AUTO_INCREMENT PRIMARY KEY,
  ItemType          VARCHAR(255),
  ItemName          VARCHAR(255),
  AdditionalInfo    VARCHAR(255),
  isAvailable       BOOLEAN,
  isOverdue         BOOLEAN
);

CREATE TABLE tbl_ItemLog(
  ItemLogID         INTEGER AUTO_INCREMENT PRIMARY KEY,
  ItemID            INTEGER NOT NULL,
  PersonFirstName   VARCHAR(255),
  PersonLastName    VARCHAR(255),
  DateBorrowed      VARCHAR(255),
  DueBackBy         VARCHAR(255),
  DateReturned      VARCHAR(255),
  hasReturned       BOOLEAN,
  FOREIGN KEY (ItemID)
        REFERENCES tbl_Item(ItemID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE tbl_ItemType(
  ItemTypeID    INTEGER AUTO_INCREMENT PRIMARY KEY,
  ItemTypeName  VARCHAR(255)
);

CREATE TABLE tbl_User(
  UserID    INTEGER AUTO_INCREMENT PRIMARY KEY,
  Email     VARCHAR(255) UNIQUE,
  Password  VARCHAR(1000)
);

INSERT INTO tbl_Item(
  ItemType,
  ItemName,
  AdditionalInfo,
  isAvailable,
  isOverdue
)
VALUES (
  'Book',
  'Cracking the Coding Interview',
  '6th Edition',
  true,
  false
), (
  'Book',
  'Ender\'s Shadow',
  'Orson Scott Card 1999 Copyright',
  false,
  true
), (
  'Tablet',
  'Pixel C',
  'Serial Num: 23wSefMa23nKaiOWe2',
  false,
  false
);

INSERT INTO tbl_ItemLog(
  ItemID,
  PersonFirstName,
  PersonLastName,
  DateBorrowed,
  DueBackBy,
  DateReturned,
  hasReturned
) VALUES(
  (SELECT ItemID FROM tbl_Item WHERE ItemID=1),
  'John',
  'WebMaster',
  '08/29/2017',
  '',
  '08/30/2017',
  true
), (
  (SELECT ItemID FROM tbl_Item WHERE ItemID=1),
  'Joe',
  'Eastwood',
  '09/01/2017',
  '',
  '09/02/2017',
  true
), (
  (SELECT ItemID FROM tbl_Item WHERE ItemID=2),
  'Joe',
  'Eastwood',
  '10/17/2017',
  '10/24/2017',
  '',
  false
), (
  (SELECT ItemID FROM tbl_Item WHERE ItemID=3),
  'Joe',
  'Eastwood',
  '10/17/2017',
  '',
  '',
  false
);

INSERT INTO tbl_ItemType(ItemTypeName) VALUES ('Book'),('Tablet');
