 
    // Simulating loading JSON data from a local file
    // Replace 'api-response.json' with the actual file name
    fetch('https://curius.app/api/users/3954/searchLinks')
        .then(response => response.json())
        .then(data => {
            // Remove the loading placeholder
            const linksContainer = document.getElementById('links-container');
            linksContainer.innerHTML = '';

            // Display the structured content on the page
            displayLinks(data.links);
        })
        .catch(error => {
            console.error('Error fetching local data:', error);
        });

    // Function to display links on the page
    function displayLinks(links) {
        // Log the 'links' variable to the console for debugging
        console.log('Links variable:', links);

        const linksContainer = document.getElementById('links-container');
        const isRecentCurius = linksContainer.classList.contains('recentcurius');
        let displayCount = isRecentCurius ? 5 : links.length;

        // Check if 'links' is an array before using 'forEach'
        if (Array.isArray(links)) {
            // If recentcurius class is present, limit displayCount to 3
            links.slice(0, displayCount).forEach(link => {
                const createdDate = new Date(link.createdDate);
                const currentDate = new Date();

                const timeDifference = currentDate - createdDate;
                const seconds = Math.floor(timeDifference / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);
                const days = Math.floor(hours / 24);
                const weeks = Math.floor(days / 7);

                let displayText;

                if (weeks >= 3) {
                    // Display formatted date for more than 3 weeks old
                    const options = { month: 'long', day: 'numeric' };
                    displayText = `on ${createdDate.toLocaleDateString('en-US', options)}`;
                    if (currentDate.getFullYear() !== createdDate.getFullYear()) {
                        displayText += ` ${createdDate.getFullYear()}`;
                    }
                } else if (days >= 1) {
                    displayText = `${days} ${days === 1 ? 'day' : 'days'} ago`;
                } else if (hours >= 1) {
                    displayText = `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
                } else if (minutes >= 1) {
                    displayText = `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
                } else {
                    displayText = `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
                }

                const linkElement = document.createElement('div');
                linkElement.innerHTML = `
                    <p class="curiusitem"><a class="curiuslink" href="${link.link}" target="_blank">${link.title}</a> <span class="curiusdate">${displayText}</span></p>
                    
                    <hr>
                `;
                linksContainer.appendChild(linkElement);
            });
        } else {
            console.error('Error: The loaded data is not an array.');
        }
    }