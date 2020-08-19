const search = document.querySelector('#search');
const outputList = document.querySelector('#match-list');

const filteredData = async () => {
    const value = search.value;
    const res = await fetch('../data/upazila.json');
    const data = await res.json();
    const matches = data.filter(upazila => {
        const regex = new RegExp(`^${value}`, 'gi');
        return upazila.upazila.match(regex) || upazila.district.match(regex) || upazila.division.match(regex);
    });

    if(value.length > 0) {
        const html = matches.map(match => `
            <div class="card card-body mb-1">
                <h5><span class="text-white">${match.upazila}</span>, <span class="text-success">${match.district}</span>, <span class="text-warning">${match.division}</span></h5>
            </div>
        `).join('');
        outputList.innerHTML = html;

    } else {
        outputList.innerHTML = ''
    };
};

search.addEventListener('input', filteredData)