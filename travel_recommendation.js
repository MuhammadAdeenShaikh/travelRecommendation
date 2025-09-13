const btnSearch = document.querySelector('.search-btn');
const btnClear = document.querySelector('.clear-btn');
const resultDiv = document.getElementById('result');

// Search function
function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            let found = false;

            // ✅ Country Search
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            if (country) {
                resultDiv.innerHTML += `<h2>${country.name}</h2>`;
                country.cities.forEach(city => {
                    resultDiv.innerHTML += `
                        <div class="card">
                            <img src="${city.imageUrl}" alt="${city.name}">
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                        </div>
                    `;
                });
                found = true;
            }

            // ✅ Beach Search
            if (input === "beach" || input === "beaches") {
                resultDiv.innerHTML += `<h2>Famous Beaches</h2>`;
                data.beaches.forEach(beach => {
                    resultDiv.innerHTML += `
                        <div class="card">
                            <img src="${beach.imageUrl}" alt="${beach.name}">
                            <h3>${beach.name}</h3>
                            <p>${beach.description}</p>
                        </div>
                    `;
                });
                found = true;
            }

            // ✅ Temple Search
            if (input === "temple" || input === "temples") {
                resultDiv.innerHTML += `<h2>Famous Temples</h2>`;
                data.temples.forEach(temple => {
                    resultDiv.innerHTML += `
                        <div class="card">
                            <img src="${temple.imageUrl}" alt="${temple.name}">
                            <h3>${temple.name}</h3>
                            <p>${temple.description}</p>
                        </div>
                    `;
                });
                found = true;
            }

            // ✅ Not Found Case
            if (!found) {
                resultDiv.innerHTML = `<p>No recommendations found for "${input}".</p>`;
            }
        })
        .catch(error => {
            console.log('Error:', error);
            resultDiv.innerHTML = '<p>An error occurred while fetching data</p>';
        });
}

// ✅ Clear function
function clearResults() {
    document.getElementById('conditionInput').value = '';
    document.getElementById('result').innerHTML = "";     // results clear
}

// Event listeners
btnSearch.addEventListener('click', searchCondition);
btnClear.addEventListener('click', clearResults);
