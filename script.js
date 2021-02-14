// ダメージレンジ・ログナンバー
const damageRange = 0.5,
      criticalHitRate = 0.1; 
let logIndex = 0;

// キャラクターデータ
const player = {
        name: 'ランスロット（あなた）',
        img: 'img/char1-battle.png',
        hp: 50,
        at: 40,
        df: 20
    }

const char = [
    {
        name: 'ランスロット',
        img: 'img/char1-battle.png',
        hp: 50,
        at: 40,
        df: 20
    },
    {
        name: 'シルフェ',
        img: 'img/char2-battle.png',
        hp: 100,
        at: 40,
        df: 20
    },
    {
        name: 'アヌビス',
        img: 'img/char3-battle.png',
        hp: 200,
        at: 40,
        df: 20
    },
    {
        name: 'メジェド',
        img: 'img/char4-battle.png',
        hp: 1,
        at: 200,
        df: 20
    },
    {
        name: 'エルルーン',
        img: 'img/char5-battle.png',
        hp: 200,
        at: 40,
        df: 20
    }
]

player.maxHP = player.hp;
char[0]['maxHP'] = char[0].hp;
char[1]['maxHP'] = char[1].hp;
char[2]['maxHP'] = char[2].hp;
char[3]['maxHP'] = char[3].hp;
char[4]['maxHP'] = char[4].hp;


//キャラキャララクター情報出力
// キャラ1
document.querySelector('#charaname1').textContent = char[0].name;
document.querySelector('#HP1').textContent = char[0].hp;
document.querySelector('#Attack1').textContent =  char[0].at;
// キャラ2
document.querySelector('#charaname2').textContent = char[1].name;
document.querySelector('#HP2').textContent = char[1].hp;
document.querySelector('#Attack2').textContent =  char[1].at;
// キャラ3
document.querySelector('#charaname3').textContent = char[2].name;
document.querySelector('#HP3').textContent = char[2].hp;
document.querySelector('#Attack3').textContent =  char[2].at;
// キャラ4
document.querySelector('#charaname4').textContent = char[3].name;
document.querySelector('#HP4').textContent = char[3].hp;
document.querySelector('#Attack4').textContent =  char[3].at;
// キャラ5
document.querySelector('#charaname5').textContent = char[4].name;
document.querySelector('#HP5').textContent = char[4].hp;
document.querySelector('#Attack5').textContent =  char[4].at;

// テキスト・画像挿入関数
function insertText(id, text) {
    document.querySelector(id).textContent = text;
}
function insertImage(id, img) {
    document.querySelector(id).src = img;
}
// ダメージ計算
function damageCalculation(attack, defense) {
    const maxDamage = attack * (1 + damageRange),
          minDamage = attack * (1 - damageRange),
          attackDamage = Math.floor(Math.random() * (maxDamage - minDamage) + minDamage);
    
    const damage = attackDamage - defense;

    if(damage < 1){
        return 0;
    }else {
        return damage;
    }
}

// ログ表示
function insertLog(texts) {
    const logsElement = document.querySelector('#logs'),
    createLog = document.createElement('li');
    logIndex += 1;
    createLog.innerHTML = logIndex + '： ' + texts;
    logsElement.insertBefore(createLog, logsElement.firstChild);    
}

// プレイヤーキャラ
insertText('#player-name', player.name);
insertImage('#player-img', player.img);
insertText('#player-max-hp', player.hp);
insertText('#current-player-hp', player.hp);
// 敵キャラ
let enemy = char[Math.floor(Math.random() * 5)];
insertText('#enemy-name', enemy.name);
insertImage('#enemy-img', enemy.img);
insertText('#enemy-max-hp', enemy.hp);
insertText('#current-enemy-hp', enemy.hp);


// 戦闘
// じゃんけんでif切替する部分
document.querySelector('#do-attack').addEventListener('click', function() {
    let endGame = false;
    let myTactics = document.querySelector('#janken').selectedIndex;
    let myHand = document.querySelector('#janken').value;
    // CPUの出す手を決定
    let cpuTactics = Math.floor(Math.random() * 3);
    let cpuHand;
    switch(cpuTactics) {
        case 0:
            cpuHand = 'グー'
            break;
        case 1:
            cpuHand = 'チョキ'
            break;
        case 2:
            cpuHand = 'パー'
            break;
    }

    let result;
    if(myTactics === 0 && cpuTactics === 1) {
        result = true;
    }else if(myTactics === 1 && cpuTactics === 2) {
        result = true;
    }else if(myTactics === 2 && cpuTactics === 1){
        result = true;
    }else if(myTactics === 2 && cpuTactics === 1) {
        insertLog(player.name + 'は' + myHand + '。' + enemy.name + 'は' + cpuHand + '。相殺した！' )
    }else {
        result = false;
    }

    if(result) {
        insertLog(player.name + 'は' + myHand + '。' + enemy.name + 'は' + cpuHand + '。プレイヤーの勝ち！' );
        
        let playerDamage = damageCalculation(player.at, enemy.df);
        if(Math.random() < criticalHitRate) {
            playerDamage *= 2;
            insertLog(player.name + 'の渾身の一撃！' + enemy.name + 'に' + playerDamage + 'のダメージ！');
        }else {
            insertLog(player.name + 'の攻撃！' + enemy.name + 'に' + playerDamage + 'のダメージ！');
        }
        
        // ダメージ計算・反映
        enemy.hp -= playerDamage;
        insertText('#current-enemy-hp', enemy.hp);
        document.querySelector('#current-enemy-gauge').style.width = (enemy.hp / enemy['maxHP'] * 100) + '%';
        if((enemy.hp / enemy.maxHP * 100) <= 25){
            document.querySelector('#current-enemy-gauge').classList.add('red');
        }
    }else {
        insertLog(player.name + 'は' + myHand + '。' + enemy.name + 'は' + cpuHand + '。CPUの勝ち！' );
        
        let enemyDamage = damageCalculation(enemy.at, player.df);
        if(Math.random() < criticalHitRate) {
            enemyDamage *= 2;
            insertLog('<span style="color: red;">' + enemy.name + 'の痛恨の攻撃！' + player.name + 'に' + enemyDamage + 'のダメージ！' + '</span>');
        }else {
            insertLog('<span style="color: red;">' + enemy.name + 'の攻撃！' + player.name + 'に' + enemyDamage + 'のダメージ！' + '</span>');
        }

        // ダメージ計算・反映
        player.hp -= enemyDamage;
        insertText('#current-player-hp', player.hp);
        document.querySelector('#current-player-gauge').style.width = (player.hp / player.maxHP * 100) + '%';
        if((player.hp / player.maxHP * 100) <= 25){
            document.querySelector('#current-player-gauge').classList.add('red');
        }
    }

    // 勝敗がついた場合の処理
    if(enemy.hp <= 0 ){
        endGame = true;
        enemy.hp = 0;
        insertText('#current-enemy-hp', enemy.hp);
        document.querySelector('#current-enemy-gauge').style.width = '0%';
        insertLog(enemy.name + 'を倒した！');
    }else if(player.hp <= 0){      
        endGame = true;
        player.hp = 0;
        insertText('#current-player-hp', player.hp);
        document.querySelector('#current-player-gauge').style.width = '0%';
        insertLog(enemy.name + 'に負けた...。目の前がまっくらになった。');
    }
    if(endGame){
        this.classList.add('deactive');
    }
})