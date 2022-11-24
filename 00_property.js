// ログインユーザーのメールアドレス
const mailAdress = Session.getActiveUser().getUserLoginId();
let loginManagerName = "";

// システム設定スプレッドシート
const Memberslist = ["c5622040@aoyama.jp", "篠原和真", "管理者"];

// DBスプレッドシート
const DBSpreadSheet = SpreadsheetApp.openById("1sj3AwNJmg0M_FL_6YcdJmF-ZtuqdcGavRqZPkIIOvIk");
const TemplateSheet = DBSpreadSheet.getSheetByName("template");