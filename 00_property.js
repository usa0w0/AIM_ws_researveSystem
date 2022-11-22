// ログインユーザーのメールアドレス
const mailAdress = Session.getActiveUser().getUserLoginId();
let loginManagerName = "";

// システム設定スプレッドシート
const SettingSpreadSheet = SpreadsheetApp.openById("1r8rFRh-kApFbPuNxALtvhHG9ekGAjKkUlGUMImW1aFo");
const Memberslist = SettingSpreadSheet.getSheetByName("管理者権限").getDataRange().getValues().flat();

// DBスプレッドシート
const DBSpreadSheet = SpreadsheetApp.openById("1rs_eCD--OZPGFeo_Nd5tXKgoXDF0GgmFXQF6xENi3UE");
const TemplateSheet = DBSpreadSheet.getSheetByName("template");
const IdSheet = DBSpreadSheet.getSheetByName("ID対応表");
const IdList = IdSheet.getDataRange().getValues().slice(1).reduce((IdList, [uuid, sheet_name]) => Object.assign(IdList, {[uuid]: DBSpreadSheet.getSheetByName(sheet_name)}), {});