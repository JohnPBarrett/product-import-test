# product-import-test

## Installation

    git clone https://github.com/JohnPBarrett/product-import-test.git
    cd product-import-test
    npm i
    
To run test then once dependencies have been installed then please run npm test


    
## What I have done
  
Have created an app that can read from a csv file and convert to JSON. Have added initial validation to check product row is valid. Have also added a suite of tests using Jest for each function.

## Further improvements needed

Still need to link current products JSON file to rest of app so that the file does not repeatedly get overwritten whenever it is run. 

Also need to store the contents from JSON file into a variable so I can check if product already exists when I am reading the CSV. This way I can determine whether I need to modify product or leave unchanged. 

Console log for unchanged needs to be created. 

A db store and api functionality would improve storage issues and would allow a user to query the data.

## Problems faced

Have not had much recent practice with consuming CSV files and I believe this was the first time I've used CSV parser. There was an initial learning curve with getting to grips with it and making it do what I needed it to do. 


