const search = document.getElementById('search');
const outputList = document.getElementById('match-list');

const showData = async () => {
    const value = search.value;
    const res = await fetch('../data/data.json');
    const data = await res.json();
    const regEx = new RegExp(`^${value}`, 'gi');

    const matches = data.filter(union => {
        return union.name.match(regEx) || union.url.split('.')[1].match(regEx);
    });
    
    if(value.length > 0) {
        const html = matches.map(match => `
            <div class="bg-light card-body mb-1">
                <h5>${match.name} (${match.bn_name})</h5>
                <small>url: <span class="text-info">${match.url}</span></small>
            </div>
        `)
        .sort((a, b) => a < b ? -1 : 0)
        .join('');

        outputList.innerHTML = html;
    } else {
        outputList.innerHTML = ''; 
    }
};

search.addEventListener('input', showData);