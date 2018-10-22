var ObjLottery = {
	ObjListpWinners: [
		// {
		// 	Name: 'Вася',
		// 	Surname: 'Пяточкин',
		// 	Date: '03.10.2018',
		// 	Email: 'vasya_pyatochkin@gmail.com',
		// 	Phone: '0977377252'
		// },
		// {
		// 	Name: 'Вова',
		// 	Surname: 'Марченко',
		// 	Date: '03.10.2018',
		// 	Email: 'vladimir_mar@ukr.net',
		// 	Phone: '0987377252'
		// }
	],
	ObjListpParticipants: [
		// {
		// 	Name: 'Вася',
		// 	Surname: 'Пяточкин',
		// 	Date: '03.10.2018',
		// 	Email: 'vasya_pyatochkin@gmail.com',
		// 	Phone: '0977377252'
		// },
		// {
		// 	Name: 'Вова',
		// 	Surname: 'Марченко',
		// 	Date: '03.10.2018',
		// 	Email: 'vladimir_mar@ukr.net',
		// 	Phone: '0987377252'
		// }
	],
	startLoading: function(){
		ObjLottery.winnerList();
		ObjLottery.participantsList();
	},
	winnerList: function(){
		ObjLottery.CreateList.basis(ObjLottery.ObjListpWinners, 'winner', 6);
	},
	participantsList: function(){
		ObjLottery.CreateList.basis(ObjLottery.ObjListpParticipants, 'participants', 7);
	},
	CreateList: {
		basis: function(Obj, Selector, Num){
			ObjLottery.CreateList.deleteItems(Selector);
			var Html = null,
				ListLength = Obj.length;
			if ( ListLength ) {
				var i = null,
					b = null,
					TdIdName = '',
					TdIdSurname = '',
					TdIdDate = '',
					TdIdEmail = '',
					TdIdPhone = '';
					TdIdButton = '';
				for (i = 0; i < ListLength; i++) {
					if (Num === 7){
						TdIdName = ' id="td_part_name'+i+'"';
						TdIdSurname = ' id="td_part_surname'+i+'"';
						TdIdDate = ' id="td_part_date'+i+'"';
						TdIdEmail = ' id="td_part_email'+i+'"';
						TdIdPhone = ' id="td_part_phone'+i+'"';
						TdIdButton = ' id="td_part_button'+i+'"';
					}	
					b = i + 1;
					Html = '<td>'+b+'</td>'+
						'<td'+TdIdName+'>'+Obj[i].Name+'</td>'+
						'<td'+TdIdSurname+'>'+Obj[i].Surname+'</td>'+
						'<td'+TdIdDate+'>'+Obj[i].Date+'</td>'+
						'<td'+TdIdEmail+'>'+Obj[i].Email+'</td>'+
						'<td'+TdIdPhone+'>'+Obj[i].Phone+'</td>';
					if (Num === 7){
						Html += '<td'+TdIdButton+'><button onclick="ObjLottery.editParticipant('+i+');">&#8617;</button></td>';
					}
					ObjLottery.CreateList.placing(Html, Selector);
				}
			} else {
				Html = '<td colspan="'+Num+'">Пока никого нет...</td>';
				ObjLottery.CreateList.placing(Html, Selector);
			}
		},
		placing: function(Html, Selector){
			var CreateTr = document.createElement('tr');
			CreateTr.className = 'item-'+Selector;
			CreateTr.innerHTML = Html;
			document.getElementById('js_list-'+Selector).appendChild(CreateTr);
		},
		deleteItems: function(Selector){
			var Cells = document.getElementById('js_list-'+Selector).getElementsByClassName('item-'+Selector);
				Len = Cells.length;
			for(var i = 0; i < Len; i++) {
			        Cells[0].parentNode.removeChild(Cells[0]);
			}
		}
	},
	getNewWinner: function(){
		var Min = 0,
			Max = ObjLottery.ObjListpParticipants.length,
	  		Winner = Math.floor(Math.random() * (Max - Min)) + Min;
		ObjLottery.ObjListpWinners.unshift(ObjLottery.ObjListpParticipants[Winner]);
		ObjLottery.winnerList();
	},
	addNewParticipant: function(){
		var LocRawData = {
				Name: 'fr-name',
				Surname: 'fr-surname',
				Date: 'fr-date',
				Email: 'fr-email',
				Phone: 'fr-phone'
			},
			Pass = {
				Name: false,
				Surname: false,
				Email: false
			},
			IdLoc = null;
		for(var Key in LocRawData) {
			IdLoc = document.getElementById(LocRawData[Key]);
			switch (LocRawData[Key]) {
			    case 'fr-name':
			    case 'fr-surname':
					if (IdLoc.value.length < 3 || /^[a-z0-9]+$/i.test(IdLoc.value)){
				   		ObjLottery.moderationForm(IdLoc);
					} else {
						Pass[Key] = true;
					}
				   	break;
			    case 'fr-email':
				    var ValEmail = IdLoc.value;
			    		Letter1 = ValEmail.indexOf("@");
				   		Letter2 = ValEmail.indexOf(".");
				   	if (IdLoc.value.length < 5 || Letter1 < 0 || Letter2 < 0){
				   		ObjLottery.moderationForm(IdLoc);
				   	} else {
						Pass[Key] = true;
					}
				   	break;
			}
		}
		if (Pass.Name == true && Pass.Surname == true && Pass.Email == true) {
			Pass.Name = false;
			Pass.Surname = false;
			Pass.Email = false;
			var LocObj = {};
			for(var Key in LocRawData) {
				LocObj[Key] = document.getElementById(LocRawData[Key]).value;
			}
			ObjLottery.ObjListpParticipants.unshift(LocObj);
			ObjLottery.participantsList();
		}
	},
	moderationForm: function(IdLoc){
		IdLoc.classList.add('error');
		setTimeout(function(){
			IdLoc.classList.remove('error')
		}, 3000);
	},
	editParticipant: function(Int){
		document.getElementById('td_part_name'+Int).innerHTML = '<input type="text" value="'+ObjLottery.ObjListpParticipants[Int].Name+'">';
		document.getElementById('td_part_surname'+Int).innerHTML = '<input type="text" value="'+ObjLottery.ObjListpParticipants[Int].Surname+'">';
		document.getElementById('td_part_date'+Int).innerHTML = '<input type="date" value="'+ObjLottery.ObjListpParticipants[Int].Date+'">';
		document.getElementById('td_part_email'+Int).innerHTML = '<input type="email" value="'+ObjLottery.ObjListpParticipants[Int].Email+'">';
		document.getElementById('td_part_phone'+Int).innerHTML = '<input type="tel" value="'+ObjLottery.ObjListpParticipants[Int].Phone+'">';
		document.getElementById('td_part_button'+Int).innerHTML = '<td><button onclick="ObjLottery.saveChanges('+Int+');">&#10150;</button></td>';	
	},
	saveChanges: function(Int){
		ObjLottery.ObjListpParticipants[Int] = {
			Name: document.querySelector('#td_part_name'+Int+' input').value,
			Surname: document.querySelector('#td_part_surname'+Int+' input').value,
			Date: document.querySelector('#td_part_date'+Int+' input').value,
			Email: document.querySelector('#td_part_email'+Int+' input').value,
			Phone: document.querySelector('#td_part_phone'+Int+' input').value
		};
		ObjLottery.participantsList();
	}
}