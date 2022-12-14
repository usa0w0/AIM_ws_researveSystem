function saveRequest(unique_id, ANSWER){
	const WORKSHOP = callDB()[unique_id]
	const workshop_name = WORKSHOP.name

	// 予約者シートを取得
	const DBSheet = DBSpreadSheet.getSheetByName(workshop_name + "_" + unique_id);

	// 回答を保存
	let request = new Array(new Date(), mailAdress).concat(ANSWER.map(answer => answer.value));
	DBSheet.getRange(DBSheet.getLastRow()+1, 1, 1, request.length).setValues([request]);

	return 0
}

function cancelRequest(unique_id){
	const WORKSHOP = callDB()[unique_id]
	const workshop_name = WORKSHOP.name

	// 予約者シートを取得
	const DBSheet = DBSpreadSheet.getSheetByName(workshop_name + "_" + unique_id);
	const data = DBSheet.getDataRange().getValues();

	for (let i=0; i<DBSheet.getLastRow(); i++){
		if (data[i][1] == mailAdress){
			DBSheet.deleteRow(i+1)
		}
	}

	return 0
}