export const databases = [
  {
    name: "ERP_DEV_MSSQL",
    env: "DEV",
    host: "10.10.1.21",
    status: "선택됨",
    active: true,
  },
  {
    name: "ERP_TEST_MSSQL",
    env: "TEST",
    host: "10.10.1.35",
    status: "사용 가능",
    active: false,
  },
  {
    name: "ERP_PROD_MSSQL",
    env: "PROD",
    host: "10.10.1.10",
    status: "승인 필요",
    active: false,
  },
];

export const workHistory = [
  {
    id: "sample-20260601-014",
    displayId: "WRK-20260601-014",
    type: "화면 개발",
    program: "발주현황조회",
    service: "PurchaseOrderStatusService",
    sp: "USP_PO_STATUS_LIST_S",
    database: "ERP_DEV_MSSQL",
    owner: "김민준",
    status: "검토 대기",
    time: "2026-06-01 16:20",
  },
  {
    id: "sample-20260601-013",
    displayId: "WRK-20260601-013",
    type: "화면 개발",
    program: "거래처정산관리",
    service: "VendorSettlementService",
    sp: "USP_VENDOR_SETTLEMENT_S",
    database: "ERP_TEST_MSSQL",
    owner: "이서연",
    status: "쿼리 생성",
    time: "2026-06-01 15:42",
  },
  {
    id: "sample-20260531-028",
    displayId: "WRK-20260531-028",
    type: "SP 자동생성",
    program: "재고수불집계",
    service: "InventoryLedgerService",
    sp: "USP_INV_LEDGER_SUMMARY_S",
    database: "ERP_DEV_MSSQL",
    owner: "박지훈",
    status: "임시저장",
    time: "2026-05-31 18:10",
  },
];

export const generatedSql = `BEGIN TRAN;

INSERT INTO UI_PROGRAM (
  PROGRAM_ID,
  PROGRAM_NAME,
  BUSINESS_SERVICE,
  MAIN_SP,
  DATABASE_ALIAS,
  CREATED_BY
) VALUES (
  'PO_STATUS_LIST',
  N'발주현황조회',
  'PurchaseOrderStatusService',
  'USP_PO_STATUS_LIST_S',
  'ERP_DEV_MSSQL',
  'demo.user'
);

INSERT INTO UI_SCREEN_FIELD (
  PROGRAM_ID,
  FIELD_KEY,
  FIELD_LABEL,
  FIELD_TYPE,
  SORT_ORDER
) VALUES
  ('PO_STATUS_LIST', 'poNo', N'발주번호', 'text', 10),
  ('PO_STATUS_LIST', 'vendorName', N'거래처', 'text', 20),
  ('PO_STATUS_LIST', 'poDate', N'발주일자', 'date', 30),
  ('PO_STATUS_LIST', 'amount', N'금액', 'number', 40);

INSERT INTO UI_SEARCH_CONDITION (
  PROGRAM_ID,
  CONDITION_KEY,
  CONDITION_LABEL,
  CONDITION_TYPE,
  SORT_ORDER
) VALUES
  ('PO_STATUS_LIST', 'poDateFrom', N'발주일자 시작', 'date', 10),
  ('PO_STATUS_LIST', 'poDateTo', N'발주일자 종료', 'date', 20),
  ('PO_STATUS_LIST', 'vendorCode', N'거래처', 'popup', 30);

-- DEMO ONLY: 실제 DB에는 연결하지 않습니다.
ROLLBACK;`;

export const steps = [
  { label: "작업 생성", href: "/automation/new" },
  { label: "UI 생성 검토", href: "/automation/sample-20260601-014/ui-review" },
  { label: "쿼리 생성", href: "/query-generation/new" },
  { label: "작업 이력", href: "/automation/history" },
];

export const spGeneratedSql = `CREATE OR ALTER PROCEDURE dbo.USP_PO_STATUS_LIST_S
  @PoDateFrom DATE,
  @PoDateTo DATE,
  @VendorCode NVARCHAR(30) = NULL,
  @PlantCode NVARCHAR(20)
AS
BEGIN
  SET NOCOUNT ON;

  SELECT
    PO.PO_NO,
    PO.PO_DATE,
    PO.VENDOR_CODE,
    V.VENDOR_NAME,
    SUM(POD.SUPPLY_AMOUNT) AS SUPPLY_AMOUNT,
    SUM(POD.VAT_AMOUNT) AS VAT_AMOUNT,
    PO.APPROVAL_STATUS
  FROM TB_PUR_ORDER PO
  INNER JOIN TB_PUR_ORDER_DETAIL POD
    ON POD.PO_NO = PO.PO_NO
  INNER JOIN TB_VENDOR V
    ON V.VENDOR_CODE = PO.VENDOR_CODE
  WHERE PO.PLANT_CODE = @PlantCode
    AND PO.PO_DATE >= @PoDateFrom
    AND PO.PO_DATE < DATEADD(DAY, 1, @PoDateTo)
    AND (@VendorCode IS NULL OR PO.VENDOR_CODE = @VendorCode)
    AND PO.DELETE_YN = 'N'
  GROUP BY
    PO.PO_NO,
    PO.PO_DATE,
    PO.VENDOR_CODE,
    V.VENDOR_NAME,
    PO.APPROVAL_STATUS
  ORDER BY PO.PO_DATE DESC, PO.PO_NO DESC;
END;`;
