const levelNames = [
  'Associate',
  'Senior Developer',
  'Architect'
]

const experienceNames = [
  '( 1 - 3 ) years',
  '( 3 - 5 ) years',
  '( 5 - 7 ) years',
]

let experieceValues = [
  [
    '"1+ years * experience"',
    '"2+ years * experience"',
    '"3+ years * experience"',
  ],
  [
    '"3+ years * experience"',
    '"4+ years * experience"',
    '"5+ years * experience"',
  ],
  [
    '"5+ years * experience"',
    '"6+ years * experience"',
    '"7+ years * experience"',
  ],
]

let levelValues = [
    [
        `intitle:"SDE 1"`,
        `intitle:"Software 1"`,
        `intitle:"SDE I"`,
        `intitle:"Software I"`,
      ],
      [
        `(intitle:"Software II" OR intitle:"SDE 3")`,
        `(intitle:"Software III" OR intitle:"SDE 2")`,
        `(intitle:"Software 2" OR intitle:"Software 3")`,
        `(intitle:"SDE III" OR intitle:"SDE II")`
      ],  
      [
        `intitle:Architect (Swiggy OR Zomato OR Paytm OR Flipkart)`,
        `intitle:"Principal Engineer" (Swiggy OR Zomato OR Paytm OR Flipkart)`,
        `intitle:"Staff Engineer" (Swiggy OR Zomato OR Paytm OR Flipkart)`,
        `intitle:Architect (Uber OR Ola OR Bharatpe OR Yahoo)`,
        `intitle:"Principal Engineer" (Uber OR Ola OR Bharatpe OR Yahoo)`,
        `intitle:"Staff Engineer" (Uber OR Ola OR Bharatpe OR Yahoo)`,
        `intitle:Architect (Directi OR inmobi OR Gojek OR Hotstar)`,
        `intitle:"Principal Engineer" (Directi OR inmobi OR Gojek OR Hotstar)`,
        `intitle:"Staff Engineer" (Directi OR inmobi OR Gojek OR Hotstar)`,
        `intitle:Architect (Oyo OR Myntra OR makemytrip OR Rakuten)`,
        `intitle:"Principal Engineer" (Oyo OR Myntra OR makemytrip OR Rakuten)`,
        `intitle:"Staff Engineer" (Oyo OR Myntra OR makemytrip OR Rakuten)`,
      ]
]
let levels = {}, experiences = {};
for(let i = 0; i<levelValues.length; i++){
    levels[levelNames[i]] = levelValues[i];
}

for(let i = 0; i<experieceValues.length; i++){
  experiences[experienceNames[i]] = experieceValues[i];
}

export {levels,levelNames,experiences,experienceNames};
