// ログインユーザーのメールアドレス
const mailAdress = Session.getActiveUser().getUserLoginId();
let loginManagerName = "";

// システム設定スプレッドシート
const SettingSpreadSheet = SpreadsheetApp.openById("1r8rFRh-kApFbPuNxALtvhHG9ekGAjKkUlGUMImW1aFo");
const Memberslist = SettingSpreadSheet.getSheetByName("管理者権限").getDataRange().getValues().flat();

// DBスプレッドシート
const DBSpreadSheet = SpreadsheetApp.openById("1rs_eCD--OZPGFeo_Nd5tXKgoXDF0GgmFXQF6xENi3UE");
const TemplateSheet = DBSpreadSheet.getSheetByName("template");