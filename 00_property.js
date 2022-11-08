// ログインユーザーのメールアドレス
const mailAdress = Session.getActiveUser().getUserLoginId();
let loginManagerName = "";

// システム設定スプレッドシート
const SettingSpreadSheet = SpreadsheetApp.openById("1r8rFRh-kApFbPuNxALtvhHG9ekGAjKkUlGUMImW1aFo");
const Memberslist = SettingSpreadSheet.getSheetByName("管理者権限").getDataRange().getValues().flat();