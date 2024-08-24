document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('relationship-chart');

    // キャラクターの詳細データ
    const characterDetails = {
        flock: {
            img: 'flock.jpg',
            name: 'Flock',
            description: 'Flockの詳細情報。'
        },
        thread: {
            img: 'thread.jpg',
            name: 'Thread',
            description: 'Threadの詳細情報。'
        },
        heishin: {
            img: 'heishin.jpg',
            name: 'Heysin',
            description: 'Heysinの詳細情報。'
        },
        // 他のキャラクターもここに追加
    };

    // キャラクターの位置
    const positions = {
        flock: { x: 100, y: 100 },
        thread: { x: 650, y: 100 },
        heishin: { x: 100, y: 450 },
        // 他のキャラクターもここに追加
    };

    // キャラクターの画像と名前を表示
    function createCharacter(name, position) {
        const character = document.createElement('div');
        character.classList.add('character');
        character.style.left = position.x + 'px';
        character.style.top = position.y + 'px';

        const img = document.createElement('img');
        img.src = characterDetails[name].img;
        img.alt = characterDetails[name].name;
        img.width = 100; // 画像の幅
        img.height = 100; // 画像の高さ

        const label = document.createElement('div');
        label.textContent = characterDetails[name].name;

        character.appendChild(img);
        character.appendChild(label);

        character.addEventListener('mouseover', () => highlightConnections(name));
        character.addEventListener('mouseout', () => resetConnections());

        document.body.appendChild(character);
    }

    // 矢印を描画する関数
    function drawArrow(start, end, label, id) {
        const x1 = start.x + 50; // キャラクターの中心から右にずらす
        const y1 = start.y + 100; // キャラクターの中心から下にずらす
        const x2 = end.x + 50; // キャラクターの中心から右にずらす
        const y2 = end.y + 100; // キャラクターの中心から下にずらす

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.classList.add('line');
        line.id = id;
        svg.appendChild(line);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;
        text.setAttribute("x", midX);
        text.setAttribute("y", midY);
        text.classList.add('relation-label');
        text.textContent = label;
        text.id = id + "-label";
        svg.appendChild(text);
    }

    // キャラクター間の矢印を描画
    drawArrow(positions.flock, positions.thread, '友人', 'flock-thread');
    drawArrow(positions.flock, positions.heishin, '協力者', 'flock-heishin');

    // キャラクターの詳細を表示する関数
    function showDetails(name) {
        const details = document.getElementById('details');
        const character = characterDetails[name];
        details.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.img}" alt="${character.name}" width="200">
            <p>${character.description}</p>
        `;
    }

    // キャラクターの関係をハイライトする関数
    function highlightConnections(name) {
        const relatedLines = svg.querySelectorAll(`[id^="${name}"]`);
        relatedLines.forEach(line => line.classList.add('highlight'));

        const allLines = svg.querySelectorAll('.line:not(.highlight)');
        allLines.forEach(line => line.classList.add('greyed'));

        showDetails(name);
    }

    // キャラクターの関係のハイライトをリセットする関数
    function resetConnections() {
        const highlightedLines = svg.querySelectorAll('.highlight');
        highlightedLines.forEach(line => line.classList.remove('highlight'));

        const greyedLines = svg.querySelectorAll('.greyed');
        greyedLines.forEach(line => line.classList.remove('greyed'));

        const details = document.getElementById('details');
        details.innerHTML = ''; // 詳細情報をクリア
    }

    // キャラクターの作成
    createCharacter('flock', positions.flock);
    createCharacter('thread', positions.thread);
    createCharacter('heishin', positions.heishin);
    // 他のキャラクターもここに追加
});
