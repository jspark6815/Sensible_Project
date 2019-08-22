var card_num = 1;
if(location.href.indexOf('cardboard') != -1) {
    document.getElementById('board').style.width = "calc(500px * "+Math.round(card_num/2)+" + 60px * "+Math.round(card_num/2)+")";
}

for(i=1;i<=card_num;i++) {
    document.getElementById('code'+i).value = String(CryptoJS.SHA512('code'+i)).substring(0,10);
}

function eliminateCard(code) {
    var enter = prompt('삭제하시려면 해당 모듈의 Private Code를 입력하세요.');
    if(code === enter) {
        for(i=1;i<=card_num;i++) {
            if(code == document.getElementById('code'+i).value) {
                document.getElementById('sensor'+i).style.display = "none";
            }
        }
    }
    else {
        alert('Private Code와 일치하지 않습니다.');
    }
}
function saveCard(code) {
    alert('저장되었습니다.');
    console.log(code);
}
function addCard() {
    card_num += 1;
    console.log(card_num);
    var div = document.createElement('div');
    div.setAttribute('id', 'sensor'+card_num);
    div.setAttribute('class', 'sensorCard flexible');
    div.innerHTML = document.getElementById('sensor_sample').innerHTML;
    div.childNodes[5].childNodes[1].setAttribute('id', 'code'+card_num);
    div.childNodes[3].childNodes[1].setAttribute('name','cycle'+card_num);
    div.childNodes[7].childNodes[1].setAttribute('onclick',"eliminateCard(document.getElementById('code"+card_num+"').value)")
    div.childNodes[7].childNodes[3].setAttribute('onclick',"saveCard(document.getElementById('code"+card_num+"').value)")
    
    document.getElementById('addCard').before(div);
    document.getElementById('code'+card_num).value = String(CryptoJS.SHA512('code'+card_num)).substring(0,10);
    document.getElementById('board').style.width = "calc(240px * "+Math.round((card_num + 1) /2)+" + 60px * "+Math.round((card_num+1)/2)+")";
}