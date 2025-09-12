const btnSearch = document.querySelector('.search-btn');


function searchCondition() {
        const input = document.getElementById('conditionInput').value.toLowerCase();
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const countries = data.countries.find(item => item.name.toLowerCase()  === input);

            if(countries){
                const cities = countries.cities.map(c => c.name).join(',');

                resultDiv.innerHTML += `<img src"${countries.imageUrl}" alt="Image">`;
                resultDiv.innerHTML += `<h2>${countries.name}</h2>`;

                resultDiv.innerHTML += `<p><strong>Cities:</strong> ${  cities}</p>`;
            } else {
                resultDiv.innerHTML = 'Condition not found.';
            }
        })
        .catch(error => {
            console.log('Error:', error);
            resultDiv.innerHTML = 'An error occured while fetching data';
        });
}
btnSearch.addEventListener('click', searchCondition);