document.getElementById('jsonForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const jsonInput = document.getElementById('jsonInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const filterSection = document.getElementById('filterSection');
    const responseSection = document.getElementById('responseSection');
    const responseOutput = document.getElementById('responseOutput');

    try {
        const parsedJson = JSON.parse(jsonInput);
        errorMessage.textContent = '';
        filterSection.style.display = 'block';
        responseSection.style.display = 'none';

        fetch('http://localhost:5000/bfhl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parsedJson),
        })
            .then(response => response.json())
            .then(data => {
                window.responseData = data;  // Store the response data
                filterSection.style.display = 'block';
            })
            .catch(error => {
                errorMessage.textContent = 'Error fetching the API: ' + error.message;
            });

    } catch (error) {
        errorMessage.textContent = 'Invalid JSON input';
        filterSection.style.display = 'none';
        responseSection.style.display = 'none';
    }
});

document.getElementById('filterButton').addEventListener('click', function () {
    const selectedOptions = Array.from(document.getElementById('filterOptions').selectedOptions).map(option => option.value);
    const filteredResponse = filterResponse(window.responseData, selectedOptions);

    document.getElementById('responseOutput').textContent = JSON.stringify(filteredResponse, null, 2);
    document.getElementById('responseSection').style.display = 'block';
});

function filterResponse(data, options) {
    return {
        numbers: options.includes('numbers') ? data.numbers : [],
        alphabets: options.includes('alphabets') ? data.alphabets : [],
        highest_lowercase_alphabet: options.includes('lowercase') ? data.highest_lowercase_alphabet : []
    };
}
