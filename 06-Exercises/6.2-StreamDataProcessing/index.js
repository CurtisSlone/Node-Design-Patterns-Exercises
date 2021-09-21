/*
- Transform data using streams
- Data taken from https://www.kaggle.com/jboysen/london-crime/
- Columns: lsoa_code,borough,major_category,minor_category,value,year,month
*/
import { createReadStream } from 'fs'
import parse from "csv-parse"
import { Transform,PassThrough, pipeline } from "stream"


const csvParser = parse({ columns: true })
const FILE = "london_crime_by_lsoa.csv"

/*
//
// TRANSFORM CLASSES
//
//
*/

//filter by crime category
class FilterByCrime extends Transform {
    constructor(major_category, options = {}){
        options.objectMode = true
        super(options)
        this.major_category = major_category
    }

    _transform(record,enc,cb){
        if(record.major_category === this.major_category){
            this.push(record)
        }
        cb()
    }
}

//filter by location
class FilterByLocation extends Transform {
    constructor(borough, options = {}){
        options.objectMode = true
        super(options)
        this.borough = borough
    }

    _transform(record,enc,cb){
        if(record.borough === this.borough){
            this.push(record)
        }
        cb()
    }
}

//filter by year
class FilterByYear extends Transform {
    constructor(year, options = {}){
        options.objectMode = true
        super(options)
        this.year = year
    }

    _transform(record,enc,cb){
        if(record.year === this.year){
            this.push(record)
        }
        cb()
    }
}

/*
//
//
// METHODS
//
//
*/



function main(){
    const yearSet = new Set()
    const crimeMajorCategorySet = new Set()
    const locationSet = new Set()
    pipeline(
        createReadStream(FILE),
        csvParser,
        /*
            Collect unique values of each column
            Takes awhile as the data must stream 
            through hundreds of thousands of lines of data

        */
        new Transform({ //Collect set Transforms
            objectMode: true,
            transform(record, enc,cb){
                console.log(record)
                yearSet.add(record.year)
                crimeMajorCategorySet.add(record.major_category)
                locationSet.add(record.borough)
                cb()
            }
        }),
        //Apply Filters Here
        new FilterByYear("2010"),
        new FilterByLocation("Lambeth"),
        // map sets to object
        // use map to solve lowest recurring value such as
        //--crime that was committed the most in the area
        //-- safest location of the year, etc
        (err)=>{
            console.log(err)
        }
    )

}
main()