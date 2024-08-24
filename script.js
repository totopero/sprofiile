document.addEventListener('DOMContentLoaded', () => {
    const svg = document.getElementById('relationship-chart');

    // キャラクターごとのハイライトカラーを定義
    const characterColors = {
        flock: 'blue',
        thread: 'green',
        heishin: 'red',
        // 他のキャラクターもここに追加
    };

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
            name: 'Heishin',
            description: 'Heishinの詳細情報。'
        },
        // 他のキャラクターもここに追加
    };

    // 矢印を描画する関数
    function drawArrow(x1, y1, x2, y2, label, id) {
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
    drawArrow(100, 100, 700, 100, '友人', 'flock-thread');
    drawArrow(100, 100, 100, 500, '協力者', 'flock-heishin');

    // ハイライトする関数（キャラクターごとの色を使用）
    function highlightRelations(characterId) {
        const color = characterColors[characterId] || 'blue'; // デフォルト色は青
        document.querySelectorAll('.line').forEach(line => {
            if (line.id.includes(characterId)) {
                line.classList.add('highlight');
                line.classList.remove('greyed');
                line.style.stroke = color;
            } else {
                line.classList.add('greyed');
                line.classList.remove('highlight');
                line.style.stroke = 'grey';
            }
        });

        document.querySelectorAll('.relation-label').forEach(label => {
            if (label.id.includes(characterId)) {
                label.style.fill = color;
            } else {
                label.style.fill = 'grey';
            }
        });
    }

    // ハイライト解除する関数
    function resetHighlights() {
        document.querySelectorAll('.line').forEach(line => {
            line.classList.remove('highlight');
            line.classList.remove('greyed');
            line.style.stroke = 'black'; // デフォルトの色に戻す
        });

        document.querySelectorAll('.relation-label').forEach(label => {
            label.style.fill = 'black'; // デフォルトの色に戻す
        });
    }

    // キャラクターにマウスホバーとマウスアウトのイベントリスナーを追加
    document.querySelectorAll('.character').forEach(character => {
        character.addEventListener('mouseenter', () => {
            const id = character.id;
            highlightRelations(id);
        });

        character.addEventListener('mouseleave', () => {
            resetHighlights();
        });
    });

    // モーダルウィンドウを開閉するためのイベントリスナー
    const modal = document.getElementById('character-detail-modal');
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const closeBtn = document.getElementsByClassName('close')[0];

    // キャラクタークリック時のイベントリスナー
    document.querySelectorAll('.character').forEach(character => {
        character.addEventListener('click', () => {
            const id = character.id;
            modalImg.src = characterDetails[id].img;
            modalName.textContent = characterDetails[id].name;
            modalDescription.textContent = characterDetails[id].description;
            modal.style.display = 'block';
        });
    });

    // モーダルを閉じるイベントリスナー
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // モーダルの外側をクリックしたときに閉じる
    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});
