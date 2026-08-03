window.STEM_COURSES = {
  "foundations": {
    "id": "foundations",
    "title": "Math Foundations",
    "icon": "➕",
    "color": "#58cc02",
    "description": "Build confidence with whole numbers and core operations.",
    "topics": [
      {
        "id": "addition",
        "title": "Addition",
        "description": "Add whole numbers using place value and mental strategies.",
        "icon": "➕",
        "prerequisite": null,
        "lessons": [
          {
            "id": "addition-meaning",
            "title": "What addition means",
            "pages": [
              {
                "title": "Combining quantities",
                "body": "Addition joins quantities to find a total.",
                "example": "3 + 4 = 7 means three items combined with four items make seven."
              },
              {
                "title": "Number-line jumps",
                "body": "Move right on a number line when adding positive numbers.",
                "example": "Start at 6 and move three steps right to reach 9."
              },
              {
                "title": "Order does not change the total",
                "body": "Addition is commutative: a + b = b + a.",
                "example": "5 + 8 and 8 + 5 both equal 13."
              }
            ],
            "questions": [
              {
                "id": "add-meaning-1",
                "prompt": "What is 4 + 3?",
                "type": "number",
                "answer": 7,
                "hint": "Count forward three from four.",
                "steps": [
                  "4 + 3 = 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-meaning-2",
                "prompt": "What is 9 + 5?",
                "type": "number",
                "answer": 14,
                "hint": "Count five places forward from nine.",
                "steps": [
                  "9 + 5 = 14."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-meaning-3",
                "prompt": "Which expression combines 6 objects with 4 more?",
                "type": "choice",
                "options": [
                  "6 − 4",
                  "6 + 4",
                  "6 ÷ 4",
                  "6 × 4"
                ],
                "answer": 1,
                "hint": "Combining uses addition.",
                "steps": [
                  "6 + 4 represents the combined total."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-meaning-4",
                "prompt": "Lina has 7 pencils and receives 2 more. How many pencils does she have?",
                "type": "number",
                "answer": 9,
                "hint": "Combine both groups.",
                "steps": [
                  "7 + 2 = 9."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "addition-place-value",
            "title": "Adding with place value",
            "pages": [
              {
                "title": "Ones, tens and hundreds",
                "body": "Digits have values based on position.",
                "example": "In 243, the digits mean 200, 40 and 3."
              },
              {
                "title": "Line up place values",
                "body": "Place ones below ones, tens below tens and hundreds below hundreds.",
                "example": "23 + 14 becomes 3 + 4 and 2 tens + 1 ten."
              },
              {
                "title": "Work right to left",
                "body": "Start with the smallest place value.",
                "example": "23 + 14 = 37."
              }
            ],
            "questions": [
              {
                "id": "add-place-1",
                "prompt": "What is 23 + 14?",
                "type": "number",
                "answer": 37,
                "hint": "Add ones, then tens.",
                "steps": [
                  "3 + 4 = 7.",
                  "2 tens + 1 ten = 3 tens.",
                  "Answer: 37."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-place-2",
                "prompt": "What is 42 + 35?",
                "type": "number",
                "answer": 77,
                "hint": "Line up place values.",
                "steps": [
                  "2 + 5 = 7.",
                  "4 + 3 = 7.",
                  "Answer: 77."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-place-3",
                "prompt": "What is 126 + 243?",
                "type": "number",
                "answer": 369,
                "hint": "Add each column.",
                "steps": [
                  "6 + 3 = 9.",
                  "2 + 4 = 6.",
                  "1 + 2 = 3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-place-4",
                "prompt": "Which digits are added first in 52 + 36?",
                "type": "choice",
                "options": [
                  "5 and 3",
                  "2 and 6",
                  "5 and 6",
                  "2 and 3"
                ],
                "answer": 1,
                "hint": "Begin with the ones column.",
                "steps": [
                  "The ones digits are 2 and 6."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "addition-regrouping",
            "title": "Regrouping when adding",
            "pages": [
              {
                "title": "When a column reaches ten",
                "body": "Ten ones regroup as one ten.",
                "example": "8 + 7 = 15, or 1 ten and 5 ones."
              },
              {
                "title": "Carry to the next column",
                "body": "Write the ones digit and carry the new ten.",
                "example": "27 + 18: write 5 and carry 1."
              },
              {
                "title": "Multiple regrouping",
                "body": "Large sums may need regrouping more than once.",
                "example": "368 + 457 = 825."
              }
            ],
            "questions": [
              {
                "id": "add-regroup-1",
                "prompt": "What is 27 + 18?",
                "type": "number",
                "answer": 45,
                "hint": "Regroup 15 ones.",
                "steps": [
                  "7 + 8 = 15.",
                  "Write 5 and carry 1.",
                  "2 + 1 + 1 = 4."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-regroup-2",
                "prompt": "What is 46 + 37?",
                "type": "number",
                "answer": 83,
                "hint": "Regroup the ones.",
                "steps": [
                  "6 + 7 = 13.",
                  "4 + 3 + 1 = 8."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-regroup-3",
                "prompt": "What is 158 + 267?",
                "type": "number",
                "answer": 425,
                "hint": "Regroup carefully.",
                "steps": [
                  "8 + 7 = 15.",
                  "5 + 6 + 1 = 12.",
                  "1 + 2 + 1 = 4."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-regroup-4",
                "prompt": "What is 368 + 457?",
                "type": "number",
                "answer": 825,
                "hint": "Regroup in ones and tens.",
                "steps": [
                  "368 + 457 = 825."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "addition-mental",
            "title": "Mental addition strategies",
            "pages": [
              {
                "title": "Make ten",
                "body": "Split a number so the other addend reaches ten.",
                "example": "8 + 7 = 8 + 2 + 5 = 15."
              },
              {
                "title": "Partition numbers",
                "body": "Add tens and ones separately.",
                "example": "34 + 25 = 50 + 9 = 59."
              },
              {
                "title": "Compensation",
                "body": "Round, calculate, then adjust.",
                "example": "49 + 26 = 50 + 26 − 1 = 75."
              }
            ],
            "questions": [
              {
                "id": "add-mental-1",
                "prompt": "What is 8 + 6?",
                "type": "number",
                "answer": 14,
                "hint": "Make ten with 8.",
                "steps": [
                  "8 + 2 + 4 = 14."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-mental-2",
                "prompt": "What is 34 + 25?",
                "type": "number",
                "answer": 59,
                "hint": "Add tens and ones separately.",
                "steps": [
                  "30 + 20 = 50.",
                  "4 + 5 = 9."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-mental-3",
                "prompt": "What is 49 + 26?",
                "type": "number",
                "answer": 75,
                "hint": "Round 49 to 50.",
                "steps": [
                  "50 + 26 − 1 = 75."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-mental-4",
                "prompt": "Which strategy is easiest for 99 + 48?",
                "type": "choice",
                "options": [
                  "100 + 48 − 1",
                  "90 + 40 − 8",
                  "99 − 48",
                  "100 + 48 + 1"
                ],
                "answer": 0,
                "hint": "Use compensation.",
                "steps": [
                  "100 + 48 − 1 = 147."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "addition-word",
            "title": "Addition word problems",
            "pages": [
              {
                "title": "Find the quantities",
                "body": "Identify the amounts being combined.",
                "example": "A class has 14 students and 12 arrive."
              },
              {
                "title": "Choose addition",
                "body": "Words such as total, altogether and combined often signal addition.",
                "example": "14 + 12 finds the total."
              },
              {
                "title": "Check reasonableness",
                "body": "A combined total should be at least as large as each positive part.",
                "example": "26 + 34 = 60 is sensible."
              }
            ],
            "questions": [
              {
                "id": "add-word-1",
                "prompt": "A bus has 18 passengers. Seven more board. How many are now on the bus?",
                "type": "number",
                "answer": 25,
                "hint": "Combine both groups.",
                "steps": [
                  "18 + 7 = 25."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-word-2",
                "prompt": "A student reads 26 pages on Monday and 34 on Tuesday. Total pages?",
                "type": "number",
                "answer": 60,
                "hint": "Add the daily amounts.",
                "steps": [
                  "26 + 34 = 60."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-word-3",
                "prompt": "A club has 47 batteries and receives 28 more. Total?",
                "type": "number",
                "answer": 75,
                "hint": "Combine the amounts.",
                "steps": [
                  "47 + 28 = 75."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "add-word-4",
                "prompt": "A game awards 125 points, then 240 points. Total?",
                "type": "number",
                "answer": 365,
                "hint": "Add both scores.",
                "steps": [
                  "125 + 240 = 365."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "subtraction",
        "title": "Subtraction",
        "description": "Find differences using place value and mental strategies.",
        "icon": "➖",
        "prerequisite": "addition",
        "lessons": [
          {
            "id": "sub-meaning",
            "title": "What subtraction means",
            "pages": [
              {
                "title": "Finding a difference",
                "body": "Subtraction compares or removes quantities.",
                "example": "9 − 4 = 5."
              },
              {
                "title": "Number-line movement",
                "body": "Move left when subtracting positive numbers.",
                "example": "Start at 12 and move five left to 7."
              },
              {
                "title": "Inverse relationship",
                "body": "Addition checks subtraction.",
                "example": "If 15 − 7 = 8, then 8 + 7 = 15."
              }
            ],
            "questions": [
              {
                "id": "sub-meaning-1",
                "prompt": "What is 15 − 7?",
                "type": "number",
                "answer": 8,
                "hint": "Count up from 7 to 15.",
                "steps": [
                  "15 − 7 = 8."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-meaning-2",
                "prompt": "What is 12 − 5?",
                "type": "number",
                "answer": 7,
                "hint": "Move five left from 12.",
                "steps": [
                  "12 − 5 = 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-meaning-3",
                "prompt": "Which calculation checks 18 − 6 = 12?",
                "type": "choice",
                "options": [
                  "12 + 6 = 18",
                  "18 + 6 = 24",
                  "12 − 6 = 6",
                  "18 ÷ 6 = 3"
                ],
                "answer": 0,
                "hint": "Use the inverse operation.",
                "steps": [
                  "12 + 6 = 18."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-meaning-4",
                "prompt": "A box holds 20 items and 8 are removed. How many remain?",
                "type": "number",
                "answer": 12,
                "hint": "Subtract removed items.",
                "steps": [
                  "20 − 8 = 12."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "sub-place",
            "title": "Place-value subtraction",
            "pages": [
              {
                "title": "Align place values",
                "body": "Place ones below ones and tens below tens.",
                "example": "58 − 23 uses 8 − 3 and 5 tens − 2 tens."
              },
              {
                "title": "Subtract right to left",
                "body": "Begin with ones.",
                "example": "58 − 23 = 35."
              },
              {
                "title": "Check with addition",
                "body": "Add the result to the amount removed.",
                "example": "35 + 23 = 58."
              }
            ],
            "questions": [
              {
                "id": "sub-place-1",
                "prompt": "What is 58 − 23?",
                "type": "number",
                "answer": 35,
                "hint": "Subtract ones, then tens.",
                "steps": [
                  "8 − 3 = 5.",
                  "5 − 2 = 3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-place-2",
                "prompt": "What is 94 − 41?",
                "type": "number",
                "answer": 53,
                "hint": "Align the digits.",
                "steps": [
                  "4 − 1 = 3.",
                  "9 − 4 = 5."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-place-3",
                "prompt": "What is 786 − 243?",
                "type": "number",
                "answer": 543,
                "hint": "Subtract each place.",
                "steps": [
                  "6 − 3 = 3.",
                  "8 − 4 = 4.",
                  "7 − 2 = 5."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-place-4",
                "prompt": "Which digits are subtracted first in 73 − 21?",
                "type": "choice",
                "options": [
                  "7 and 2",
                  "3 and 1",
                  "7 and 1",
                  "3 and 2"
                ],
                "answer": 1,
                "hint": "Start with ones.",
                "steps": [
                  "The ones digits are 3 and 1."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "sub-regroup",
            "title": "Regrouping and borrowing",
            "pages": [
              {
                "title": "When the top digit is smaller",
                "body": "Regroup one unit from the next place.",
                "example": "42 becomes 3 tens and 12 ones."
              },
              {
                "title": "Borrow across zero",
                "body": "You may need to regroup through a zero.",
                "example": "500 − 176 = 324."
              },
              {
                "title": "Check each regroup",
                "body": "Write the changed place values clearly.",
                "example": "This prevents losing a borrowed unit."
              }
            ],
            "questions": [
              {
                "id": "sub-regroup-1",
                "prompt": "What is 42 − 17?",
                "type": "number",
                "answer": 25,
                "hint": "Regroup one ten.",
                "steps": [
                  "12 − 7 = 5.",
                  "3 − 1 = 2."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-regroup-2",
                "prompt": "What is 63 − 28?",
                "type": "number",
                "answer": 35,
                "hint": "Regroup the ones.",
                "steps": [
                  "13 − 8 = 5.",
                  "5 − 2 = 3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-regroup-3",
                "prompt": "What is 500 − 176?",
                "type": "number",
                "answer": 324,
                "hint": "Regroup across zeros.",
                "steps": [
                  "500 − 176 = 324."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-regroup-4",
                "prompt": "What is 802 − 459?",
                "type": "number",
                "answer": 343,
                "hint": "Regroup through the zero.",
                "steps": [
                  "802 − 459 = 343."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "sub-mental",
            "title": "Mental subtraction strategies",
            "pages": [
              {
                "title": "Count up",
                "body": "Find the gap between nearby numbers.",
                "example": "63 − 58: count 58 to 63, giving 5."
              },
              {
                "title": "Subtract in parts",
                "body": "Remove tens, then ones.",
                "example": "74 − 32 = 44 − 2 = 42."
              },
              {
                "title": "Compensation",
                "body": "Round the number being subtracted, then adjust.",
                "example": "83 − 29 = 83 − 30 + 1 = 54."
              }
            ],
            "questions": [
              {
                "id": "sub-mental-1",
                "prompt": "What is 63 − 58?",
                "type": "number",
                "answer": 5,
                "hint": "Count up from 58.",
                "steps": [
                  "The gap is 5."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-mental-2",
                "prompt": "What is 74 − 32?",
                "type": "number",
                "answer": 42,
                "hint": "Subtract 30, then 2.",
                "steps": [
                  "74 − 30 = 44.",
                  "44 − 2 = 42."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-mental-3",
                "prompt": "What is 83 − 29?",
                "type": "number",
                "answer": 54,
                "hint": "Subtract 30, then add 1.",
                "steps": [
                  "83 − 30 + 1 = 54."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-mental-4",
                "prompt": "What is 201 − 98?",
                "type": "number",
                "answer": 103,
                "hint": "Subtract 100, then add 2.",
                "steps": [
                  "201 − 100 + 2 = 103."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "sub-word",
            "title": "Subtraction word problems",
            "pages": [
              {
                "title": "Difference language",
                "body": "Words such as remain, fewer and difference often indicate subtraction.",
                "example": "30 items with 8 removed leaves 22."
              },
              {
                "title": "Comparison problems",
                "body": "Subtract the smaller amount from the larger.",
                "example": "45 is 13 more than 32."
              },
              {
                "title": "Check the context",
                "body": "The remaining amount should not exceed the starting amount when removing items.",
                "example": "52 − 19 = 33."
              }
            ],
            "questions": [
              {
                "id": "sub-word-1",
                "prompt": "A shelf has 52 books. 19 are borrowed. How many remain?",
                "type": "number",
                "answer": 33,
                "hint": "Subtract borrowed books.",
                "steps": [
                  "52 − 19 = 33."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-word-2",
                "prompt": "Mia has 45 points and Noah has 32. How many more does Mia have?",
                "type": "number",
                "answer": 13,
                "hint": "Find the difference.",
                "steps": [
                  "45 − 32 = 13."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-word-3",
                "prompt": "A tank contains 120 L and 35 L are used. How many litres remain?",
                "type": "number",
                "answer": 85,
                "hint": "Subtract the amount used.",
                "steps": [
                  "120 − 35 = 85."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "sub-word-4",
                "prompt": "A trip is 300 km. After 184 km, how far remains?",
                "type": "number",
                "answer": 116,
                "hint": "Subtract distance travelled.",
                "steps": [
                  "300 − 184 = 116."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "multiplication",
        "title": "Multiplication",
        "description": "Use equal groups, tables and multi-digit methods.",
        "icon": "✖️",
        "prerequisite": "subtraction",
        "lessons": [
          {
            "id": "mul-groups",
            "title": "Equal groups and arrays",
            "pages": [
              {
                "title": "Equal groups",
                "body": "Multiplication counts equal groups efficiently.",
                "example": "4 groups of 3 equals 4 × 3 = 12."
              },
              {
                "title": "Arrays",
                "body": "Rows and columns represent multiplication.",
                "example": "3 rows of 5 make 15."
              },
              {
                "title": "Commutative property",
                "body": "Changing factor order does not change the product.",
                "example": "3 × 5 = 5 × 3."
              }
            ],
            "questions": [
              {
                "id": "mul-groups-1",
                "prompt": "What is 4 × 3?",
                "type": "number",
                "answer": 12,
                "hint": "Think of four groups of three.",
                "steps": [
                  "4 × 3 = 12."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-groups-2",
                "prompt": "What is 6 × 5?",
                "type": "number",
                "answer": 30,
                "hint": "Use six groups of five.",
                "steps": [
                  "6 × 5 = 30."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-groups-3",
                "prompt": "An array has 3 rows and 7 columns. How many items?",
                "type": "choice",
                "options": [
                  "10",
                  "21",
                  "24",
                  "37"
                ],
                "answer": 1,
                "hint": "Multiply rows by columns.",
                "steps": [
                  "3 × 7 = 21."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-groups-4",
                "prompt": "What is 8 × 2?",
                "type": "number",
                "answer": 16,
                "hint": "Double eight.",
                "steps": [
                  "8 × 2 = 16."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "mul-tables",
            "title": "Times-table strategies",
            "pages": [
              {
                "title": "Use doubles",
                "body": "The 2, 4 and 8 tables build from doubling.",
                "example": "7 × 4 is double 7 × 2."
              },
              {
                "title": "Use tens",
                "body": "Multiply by 10, then adjust.",
                "example": "9 × 6 = 10 × 6 − 6 = 54."
              },
              {
                "title": "Use known facts",
                "body": "Nearby facts help solve harder ones.",
                "example": "7 × 8 = 7 × 7 + 7 = 56."
              }
            ],
            "questions": [
              {
                "id": "mul-table-1",
                "prompt": "What is 7 × 8?",
                "type": "number",
                "answer": 56,
                "hint": "Use 7 × 7 + 7.",
                "steps": [
                  "49 + 7 = 56."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-table-2",
                "prompt": "What is 9 × 6?",
                "type": "number",
                "answer": 54,
                "hint": "Use 10 × 6 − 6.",
                "steps": [
                  "60 − 6 = 54."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-table-3",
                "prompt": "What is 12 × 4?",
                "type": "number",
                "answer": 48,
                "hint": "Use 10 × 4 + 2 × 4.",
                "steps": [
                  "40 + 8 = 48."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-table-4",
                "prompt": "What is 6 × 7?",
                "type": "number",
                "answer": 42,
                "hint": "Use a known fact.",
                "steps": [
                  "6 × 7 = 42."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "mul-distribute",
            "title": "Distributive property",
            "pages": [
              {
                "title": "Break factors apart",
                "body": "Split a factor into easy parts.",
                "example": "16 × 5 = 10 × 5 + 6 × 5."
              },
              {
                "title": "Multiply each part",
                "body": "Distribute the other factor to every part.",
                "example": "23 × 4 = 20 × 4 + 3 × 4."
              },
              {
                "title": "Combine partial products",
                "body": "Add the pieces to get the product.",
                "example": "80 + 12 = 92."
              }
            ],
            "questions": [
              {
                "id": "mul-dist-1",
                "prompt": "What is 16 × 5?",
                "type": "number",
                "answer": 80,
                "hint": "Split 16 into 10 and 6.",
                "steps": [
                  "50 + 30 = 80."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-dist-2",
                "prompt": "What is 23 × 4?",
                "type": "number",
                "answer": 92,
                "hint": "Multiply 20 and 3 separately.",
                "steps": [
                  "80 + 12 = 92."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-dist-3",
                "prompt": "Which expression equals 18 × 6?",
                "type": "choice",
                "options": [
                  "10 × 6 + 8 × 6",
                  "18 + 6",
                  "9 × 6",
                  "18 × 12"
                ],
                "answer": 0,
                "hint": "Split 18 into 10 and 8.",
                "steps": [
                  "60 + 48 = 108."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-dist-4",
                "prompt": "What is 34 × 3?",
                "type": "number",
                "answer": 102,
                "hint": "Use 30 × 3 + 4 × 3.",
                "steps": [
                  "90 + 12 = 102."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "mul-multidigit",
            "title": "Multi-digit multiplication",
            "pages": [
              {
                "title": "Multiply by ones",
                "body": "Start with the ones digit of the lower factor.",
                "example": "24 × 13 begins with 24 × 3."
              },
              {
                "title": "Multiply by tens",
                "body": "A tens digit represents groups of ten.",
                "example": "24 × 10 = 240."
              },
              {
                "title": "Add partial products",
                "body": "Combine each row.",
                "example": "72 + 240 = 312."
              }
            ],
            "questions": [
              {
                "id": "mul-multi-1",
                "prompt": "What is 24 × 13?",
                "type": "number",
                "answer": 312,
                "hint": "Use 24 × 3 and 24 × 10.",
                "steps": [
                  "72 + 240 = 312."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-multi-2",
                "prompt": "What is 35 × 12?",
                "type": "number",
                "answer": 420,
                "hint": "Use 35 × 10 + 35 × 2.",
                "steps": [
                  "350 + 70 = 420."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-multi-3",
                "prompt": "What is 48 × 11?",
                "type": "number",
                "answer": 528,
                "hint": "Use 48 × 10 + 48.",
                "steps": [
                  "480 + 48 = 528."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-multi-4",
                "prompt": "What is 125 × 16?",
                "type": "number",
                "answer": 2000,
                "hint": "Use 125 × 8, then double.",
                "steps": [
                  "125 × 8 = 1000.",
                  "Double gives 2000."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "mul-word",
            "title": "Multiplication word problems",
            "pages": [
              {
                "title": "Repeated groups",
                "body": "Look for equal groups or equal rates.",
                "example": "6 boxes with 8 items each gives 6 × 8."
              },
              {
                "title": "Area situations",
                "body": "Rectangle area is length × width.",
                "example": "7 m by 4 m has area 28 m²."
              },
              {
                "title": "Check units",
                "body": "Products may represent items, dollars or square units.",
                "example": "Label the final answer."
              }
            ],
            "questions": [
              {
                "id": "mul-word-1",
                "prompt": "There are 6 boxes with 8 batteries each. Total batteries?",
                "type": "number",
                "answer": 48,
                "hint": "Multiply boxes by batteries per box.",
                "steps": [
                  "6 × 8 = 48."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-word-2",
                "prompt": "A ticket costs $12. What do 7 tickets cost?",
                "type": "number",
                "answer": 84,
                "hint": "Multiply cost by quantity.",
                "steps": [
                  "12 × 7 = 84."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-word-3",
                "prompt": "A rectangle is 9 m by 5 m. Area?",
                "type": "number",
                "answer": 45,
                "hint": "Multiply length by width.",
                "steps": [
                  "9 × 5 = 45 m²."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "mul-word-4",
                "prompt": "A machine makes 24 parts per hour for 8 hours. Total parts?",
                "type": "number",
                "answer": 192,
                "hint": "Multiply rate by time.",
                "steps": [
                  "24 × 8 = 192."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "division",
        "title": "Division",
        "description": "Share equally, use remainders and solve rates.",
        "icon": "➗",
        "prerequisite": "multiplication",
        "lessons": [
          {
            "id": "div-sharing",
            "title": "Equal sharing",
            "pages": [
              {
                "title": "Share equally",
                "body": "Division splits a total into equal groups.",
                "example": "20 ÷ 5 = 4."
              },
              {
                "title": "Group size or number",
                "body": "Division can find the size of each group or the number of groups.",
                "example": "24 items in groups of 6 gives 4 groups."
              },
              {
                "title": "Check with multiplication",
                "body": "Multiply quotient by divisor.",
                "example": "4 × 5 = 20."
              }
            ],
            "questions": [
              {
                "id": "div-share-1",
                "prompt": "What is 20 ÷ 5?",
                "type": "number",
                "answer": 4,
                "hint": "Think: 5 times what is 20?",
                "steps": [
                  "5 × 4 = 20."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-share-2",
                "prompt": "What is 36 ÷ 6?",
                "type": "number",
                "answer": 6,
                "hint": "Use multiplication facts.",
                "steps": [
                  "6 × 6 = 36."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-share-3",
                "prompt": "24 items are placed in groups of 6. How many groups?",
                "type": "choice",
                "options": [
                  "3",
                  "4",
                  "5",
                  "6"
                ],
                "answer": 1,
                "hint": "Divide 24 by 6.",
                "steps": [
                  "24 ÷ 6 = 4."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-share-4",
                "prompt": "What is 72 ÷ 8?",
                "type": "number",
                "answer": 9,
                "hint": "Use 8 × 9.",
                "steps": [
                  "8 × 9 = 72."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "div-facts",
            "title": "Fact families",
            "pages": [
              {
                "title": "Multiplication and division",
                "body": "Each multiplication fact creates division facts.",
                "example": "7 × 8 = 56 means 56 ÷ 7 = 8."
              },
              {
                "title": "Unknown factor thinking",
                "body": "Ask what factor is missing.",
                "example": "12 × ? = 96, so ? = 8."
              },
              {
                "title": "Check exactly",
                "body": "A correct quotient recreates the dividend.",
                "example": "96 ÷ 12 = 8 because 12 × 8 = 96."
              }
            ],
            "questions": [
              {
                "id": "div-fact-1",
                "prompt": "What is 56 ÷ 7?",
                "type": "number",
                "answer": 8,
                "hint": "Use 7 × 8 = 56.",
                "steps": [
                  "56 ÷ 7 = 8."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-fact-2",
                "prompt": "What is 96 ÷ 12?",
                "type": "number",
                "answer": 8,
                "hint": "Find the missing factor.",
                "steps": [
                  "12 × 8 = 96."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-fact-3",
                "prompt": "Which multiplication checks 81 ÷ 9 = 9?",
                "type": "choice",
                "options": [
                  "9 × 9 = 81",
                  "81 × 9",
                  "9 + 9 = 18",
                  "81 − 9 = 72"
                ],
                "answer": 0,
                "hint": "Multiply divisor and quotient.",
                "steps": [
                  "9 × 9 = 81."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-fact-4",
                "prompt": "What is 144 ÷ 12?",
                "type": "number",
                "answer": 12,
                "hint": "Use 12 × 12.",
                "steps": [
                  "12 × 12 = 144."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "div-remainders",
            "title": "Remainders",
            "pages": [
              {
                "title": "Not always exact",
                "body": "Some totals cannot split evenly.",
                "example": "17 ÷ 5 = 3 remainder 2."
              },
              {
                "title": "Remainder is smaller",
                "body": "A remainder must be less than the divisor.",
                "example": "A remainder of 6 is impossible when dividing by 5."
              },
              {
                "title": "Interpret context",
                "body": "Sometimes round up or down depending on the question.",
                "example": "17 people need 4-seat cars, so 5 cars are required."
              }
            ],
            "questions": [
              {
                "id": "div-rem-1",
                "prompt": "What is 17 ÷ 5?",
                "type": "choice",
                "options": [
                  "2 r7",
                  "3 r2",
                  "4 r1",
                  "5 r3"
                ],
                "answer": 1,
                "hint": "Use the largest multiple of 5 below 17.",
                "steps": [
                  "5 × 3 = 15, remainder 2."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-rem-2",
                "prompt": "What is 29 ÷ 6?",
                "type": "choice",
                "options": [
                  "4 r5",
                  "5 r1",
                  "3 r11",
                  "4 r6"
                ],
                "answer": 0,
                "hint": "6 × 4 = 24.",
                "steps": [
                  "29 − 24 = 5."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-rem-3",
                "prompt": "17 people travel in cars that hold 4 each. Minimum cars needed?",
                "type": "number",
                "answer": 5,
                "hint": "A partial group still needs a car.",
                "steps": [
                  "17 ÷ 4 = 4 remainder 1, so 5 cars."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-rem-4",
                "prompt": "Which can be a remainder when dividing by 7?",
                "type": "choice",
                "options": [
                  "7",
                  "8",
                  "6",
                  "14"
                ],
                "answer": 2,
                "hint": "Remainder must be below 7.",
                "steps": [
                  "6 is valid."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "div-long",
            "title": "Long division basics",
            "pages": [
              {
                "title": "Divide, multiply, subtract",
                "body": "Long division repeats these steps.",
                "example": "84 ÷ 4: 8 tens ÷ 4 = 2 tens, then 4 ÷ 4 = 1."
              },
              {
                "title": "Bring down the next digit",
                "body": "After subtracting, bring down the next place.",
                "example": "This continues until all digits are used."
              },
              {
                "title": "Check the quotient",
                "body": "Multiply quotient by divisor and add any remainder.",
                "example": "21 × 4 = 84."
              }
            ],
            "questions": [
              {
                "id": "div-long-1",
                "prompt": "What is 84 ÷ 4?",
                "type": "number",
                "answer": 21,
                "hint": "Divide tens, then ones.",
                "steps": [
                  "84 ÷ 4 = 21."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-long-2",
                "prompt": "What is 156 ÷ 6?",
                "type": "number",
                "answer": 26,
                "hint": "Use long division or fact decomposition.",
                "steps": [
                  "120 ÷ 6 = 20.",
                  "36 ÷ 6 = 6."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-long-3",
                "prompt": "What is 468 ÷ 9?",
                "type": "number",
                "answer": 52,
                "hint": "Check 52 × 9.",
                "steps": [
                  "52 × 9 = 468."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-long-4",
                "prompt": "What is 936 ÷ 12?",
                "type": "number",
                "answer": 78,
                "hint": "Use a calculator only to check after working.",
                "steps": [
                  "12 × 78 = 936."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "div-word",
            "title": "Division word problems",
            "pages": [
              {
                "title": "Equal allocation",
                "body": "Divide when a total is shared equally.",
                "example": "48 items across 6 boxes gives 8 per box."
              },
              {
                "title": "Rates",
                "body": "Division can find a unit rate.",
                "example": "$90 for 5 hours means $18 per hour."
              },
              {
                "title": "Choose rounding",
                "body": "Context decides whether to keep a remainder, round up or round down.",
                "example": "Transport problems often round up."
              }
            ],
            "questions": [
              {
                "id": "div-word-1",
                "prompt": "48 batteries are packed equally into 6 boxes. How many per box?",
                "type": "number",
                "answer": 8,
                "hint": "Divide total by boxes.",
                "steps": [
                  "48 ÷ 6 = 8."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-word-2",
                "prompt": "$90 is earned over 5 hours. Dollars per hour?",
                "type": "number",
                "answer": 18,
                "hint": "Find the unit rate.",
                "steps": [
                  "90 ÷ 5 = 18."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-word-3",
                "prompt": "A 120 km trip takes 3 hours. Average km per hour?",
                "type": "number",
                "answer": 40,
                "hint": "Divide distance by time.",
                "steps": [
                  "120 ÷ 3 = 40."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "div-word-4",
                "prompt": "250 students need buses holding 48 each. Minimum buses?",
                "type": "number",
                "answer": 6,
                "hint": "Round up because every student needs a seat.",
                "steps": [
                  "250 ÷ 48 is just over 5, so 6 buses."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "fractions",
        "title": "Fractions",
        "description": "Represent, compare and calculate with fractions.",
        "icon": "🍕",
        "prerequisite": "division",
        "lessons": [
          {
            "id": "frac-parts",
            "title": "Fraction parts",
            "pages": [
              {
                "title": "Numerator and denominator",
                "body": "The numerator counts selected parts; the denominator counts equal parts in one whole.",
                "example": "3/4 means three of four equal parts."
              },
              {
                "title": "Proper and improper fractions",
                "body": "Proper fractions are below one; improper fractions are at least one.",
                "example": "5/4 is improper."
              },
              {
                "title": "Fractions on a number line",
                "body": "Fractions represent positions between whole numbers.",
                "example": "1/2 lies halfway between 0 and 1."
              }
            ],
            "questions": [
              {
                "id": "frac-parts-1",
                "prompt": "In 3/8, what is the denominator?",
                "type": "choice",
                "options": [
                  "3",
                  "8",
                  "11",
                  "24"
                ],
                "answer": 1,
                "hint": "The denominator is below the fraction bar.",
                "steps": [
                  "The denominator is 8."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-parts-2",
                "prompt": "Which fraction is greater than 1?",
                "type": "choice",
                "options": [
                  "3/5",
                  "4/7",
                  "9/8",
                  "2/3"
                ],
                "answer": 2,
                "hint": "Numerator greater than denominator means above 1.",
                "steps": [
                  "9/8 > 1."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-parts-3",
                "prompt": "What is one quarter of 28?",
                "type": "number",
                "answer": 7,
                "hint": "Divide by 4.",
                "steps": [
                  "28 ÷ 4 = 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-parts-4",
                "prompt": "Which fraction is exactly one half?",
                "type": "choice",
                "options": [
                  "2/3",
                  "3/6",
                  "4/5",
                  "5/8"
                ],
                "answer": 1,
                "hint": "Simplify each fraction.",
                "steps": [
                  "3/6 = 1/2."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "frac-equivalent",
            "title": "Equivalent fractions",
            "pages": [
              {
                "title": "Same value, different form",
                "body": "Equivalent fractions name the same quantity.",
                "example": "1/2 = 2/4."
              },
              {
                "title": "Multiply top and bottom",
                "body": "Multiply numerator and denominator by the same nonzero number.",
                "example": "3/5 × 2/2 = 6/10."
              },
              {
                "title": "Simplify",
                "body": "Divide top and bottom by a common factor.",
                "example": "8/12 simplifies to 2/3."
              }
            ],
            "questions": [
              {
                "id": "frac-eq-1",
                "prompt": "Which fraction is equivalent to 1/2?",
                "type": "choice",
                "options": [
                  "2/3",
                  "2/4",
                  "3/5",
                  "4/10"
                ],
                "answer": 1,
                "hint": "Multiply top and bottom by 2.",
                "steps": [
                  "1/2 = 2/4."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-eq-2",
                "prompt": "Simplify 8/12.",
                "type": "choice",
                "options": [
                  "4/6",
                  "2/3",
                  "3/4",
                  "1/2"
                ],
                "answer": 1,
                "hint": "Divide by 4.",
                "steps": [
                  "8 ÷ 4 / 12 ÷ 4 = 2/3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-eq-3",
                "prompt": "Which equals 3/4?",
                "type": "choice",
                "options": [
                  "6/8",
                  "4/7",
                  "9/16",
                  "3/8"
                ],
                "answer": 0,
                "hint": "Multiply numerator and denominator by 2.",
                "steps": [
                  "3/4 = 6/8."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-eq-4",
                "prompt": "Simplify 15/25.",
                "type": "choice",
                "options": [
                  "5/10",
                  "3/5",
                  "2/5",
                  "5/8"
                ],
                "answer": 1,
                "hint": "Divide by 5.",
                "steps": [
                  "15/25 = 3/5."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "frac-compare",
            "title": "Comparing fractions",
            "pages": [
              {
                "title": "Same denominator",
                "body": "With matching denominators, compare numerators.",
                "example": "5/8 > 3/8."
              },
              {
                "title": "Same numerator",
                "body": "With matching numerators, the smaller denominator gives larger pieces.",
                "example": "3/5 > 3/7."
              },
              {
                "title": "Common denominators or decimals",
                "body": "Convert before comparing unlike fractions.",
                "example": "2/3 ≈ 0.667 and 3/5 = 0.6."
              }
            ],
            "questions": [
              {
                "id": "frac-comp-1",
                "prompt": "Which is larger?",
                "type": "choice",
                "options": [
                  "5/8",
                  "3/8",
                  "Equal",
                  "Cannot tell"
                ],
                "answer": 0,
                "hint": "Same denominator: compare numerators.",
                "steps": [
                  "5/8 > 3/8."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-comp-2",
                "prompt": "Which is larger?",
                "type": "choice",
                "options": [
                  "3/5",
                  "3/7",
                  "Equal",
                  "Cannot tell"
                ],
                "answer": 0,
                "hint": "Same numerator: fifths are larger than sevenths.",
                "steps": [
                  "3/5 > 3/7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-comp-3",
                "prompt": "Which is larger?",
                "type": "choice",
                "options": [
                  "2/3",
                  "3/5",
                  "Equal",
                  "Cannot tell"
                ],
                "answer": 0,
                "hint": "Convert to decimals or fifteenths.",
                "steps": [
                  "2/3 = 10/15 and 3/5 = 9/15."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-comp-4",
                "prompt": "Order from smallest to largest.",
                "type": "choice",
                "options": [
                  "1/2, 1/4, 3/4",
                  "1/4, 1/2, 3/4",
                  "3/4, 1/2, 1/4",
                  "1/2, 3/4, 1/4"
                ],
                "answer": 1,
                "hint": "Use a number line.",
                "steps": [
                  "1/4 < 1/2 < 3/4."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "frac-add",
            "title": "Adding and subtracting fractions",
            "pages": [
              {
                "title": "Matching denominators",
                "body": "Add or subtract numerators and keep the denominator.",
                "example": "3/8 + 2/8 = 5/8."
              },
              {
                "title": "Unlike denominators",
                "body": "Find a common denominator first.",
                "example": "1/2 + 1/3 = 3/6 + 2/6 = 5/6."
              },
              {
                "title": "Simplify the result",
                "body": "Reduce the final fraction if possible.",
                "example": "2/4 simplifies to 1/2."
              }
            ],
            "questions": [
              {
                "id": "frac-add-1",
                "prompt": "What is 3/8 + 2/8?",
                "type": "choice",
                "options": [
                  "5/16",
                  "5/8",
                  "1/8",
                  "6/8"
                ],
                "answer": 1,
                "hint": "Keep denominator 8.",
                "steps": [
                  "3 + 2 = 5, so 5/8."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-add-2",
                "prompt": "What is 7/10 − 3/10?",
                "type": "choice",
                "options": [
                  "4/10",
                  "4/20",
                  "10/10",
                  "3/10"
                ],
                "answer": 0,
                "hint": "Subtract numerators.",
                "steps": [
                  "7/10 − 3/10 = 4/10 = 2/5."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-add-3",
                "prompt": "What is 1/2 + 1/4?",
                "type": "choice",
                "options": [
                  "2/6",
                  "3/4",
                  "1/6",
                  "2/4"
                ],
                "answer": 1,
                "hint": "Convert 1/2 to 2/4.",
                "steps": [
                  "2/4 + 1/4 = 3/4."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-add-4",
                "prompt": "What is 2/3 − 1/6?",
                "type": "choice",
                "options": [
                  "1/2",
                  "1/3",
                  "1/6",
                  "3/6"
                ],
                "answer": 0,
                "hint": "Convert 2/3 to 4/6.",
                "steps": [
                  "4/6 − 1/6 = 3/6 = 1/2."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "frac-multiply",
            "title": "Multiplying fractions",
            "pages": [
              {
                "title": "Multiply straight across",
                "body": "Multiply numerators and denominators.",
                "example": "2/3 × 4/5 = 8/15."
              },
              {
                "title": "Simplify before or after",
                "body": "Cancel common factors to make work easier.",
                "example": "2/3 × 9/10 simplifies before multiplying."
              },
              {
                "title": "Fraction of a quantity",
                "body": "Multiply a number by the fraction.",
                "example": "3/4 of 20 = 15."
              }
            ],
            "questions": [
              {
                "id": "frac-mul-1",
                "prompt": "What is 2/3 × 4/5?",
                "type": "choice",
                "options": [
                  "8/15",
                  "6/20",
                  "8/8",
                  "2/15"
                ],
                "answer": 0,
                "hint": "Multiply across.",
                "steps": [
                  "2 × 4 = 8 and 3 × 5 = 15."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-mul-2",
                "prompt": "What is 3/4 of 20?",
                "type": "number",
                "answer": 15,
                "hint": "Multiply 20 by 3, then divide by 4.",
                "steps": [
                  "20 ÷ 4 = 5.",
                  "5 × 3 = 15."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-mul-3",
                "prompt": "What is 1/2 × 1/3?",
                "type": "choice",
                "options": [
                  "1/5",
                  "1/6",
                  "2/3",
                  "1/3"
                ],
                "answer": 1,
                "hint": "Multiply numerators and denominators.",
                "steps": [
                  "1/2 × 1/3 = 1/6."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-mul-4",
                "prompt": "What is 2/5 of 35?",
                "type": "number",
                "answer": 14,
                "hint": "Divide by 5, then multiply by 2.",
                "steps": [
                  "35 ÷ 5 = 7.",
                  "7 × 2 = 14."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "frac-divide",
            "title": "Dividing fractions",
            "pages": [
              {
                "title": "Keep, change, flip",
                "body": "Keep the first fraction, change division to multiplication, flip the second.",
                "example": "2/3 ÷ 4/5 = 2/3 × 5/4."
              },
              {
                "title": "Use reciprocals",
                "body": "The reciprocal swaps numerator and denominator.",
                "example": "The reciprocal of 3/7 is 7/3."
              },
              {
                "title": "Interpret division",
                "body": "Division asks how many groups fit.",
                "example": "1 ÷ 1/4 = 4."
              }
            ],
            "questions": [
              {
                "id": "frac-div-1",
                "prompt": "What is the reciprocal of 3/7?",
                "type": "choice",
                "options": [
                  "3/7",
                  "7/3",
                  "−3/7",
                  "4/8"
                ],
                "answer": 1,
                "hint": "Swap numerator and denominator.",
                "steps": [
                  "Reciprocal = 7/3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-div-2",
                "prompt": "What is 1 ÷ 1/4?",
                "type": "choice",
                "options": [
                  "1/4",
                  "2",
                  "4",
                  "5"
                ],
                "answer": 2,
                "hint": "How many quarters make one whole?",
                "steps": [
                  "Four quarters make one."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-div-3",
                "prompt": "What is 2/3 ÷ 4/5?",
                "type": "choice",
                "options": [
                  "5/6",
                  "8/15",
                  "6/5",
                  "10/12"
                ],
                "answer": 0,
                "hint": "Multiply by 5/4.",
                "steps": [
                  "2/3 × 5/4 = 10/12 = 5/6."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "frac-div-4",
                "prompt": "What is 3/4 ÷ 1/2?",
                "type": "choice",
                "options": [
                  "3/8",
                  "3/2",
                  "2/3",
                  "1/4"
                ],
                "answer": 1,
                "hint": "Multiply by 2/1.",
                "steps": [
                  "3/4 × 2 = 6/4 = 3/2."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "percentages",
        "title": "Percentages",
        "description": "Connect fractions, decimals and real-world percentages.",
        "icon": "💯",
        "prerequisite": "fractions",
        "lessons": [
          {
            "id": "pct-meaning",
            "title": "Understanding percentages",
            "pages": [
              {
                "title": "Per hundred",
                "body": "Percent means per 100.",
                "example": "35% = 35/100."
              },
              {
                "title": "Convert to decimal",
                "body": "Divide by 100.",
                "example": "7% = 0.07."
              },
              {
                "title": "Convert decimal to percent",
                "body": "Multiply by 100.",
                "example": "0.6 = 60%."
              }
            ],
            "questions": [
              {
                "id": "pct-meaning-1",
                "prompt": "Convert 0.6 to a percentage.",
                "type": "number",
                "answer": 60,
                "hint": "Multiply by 100.",
                "steps": [
                  "0.6 × 100 = 60%."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-meaning-2",
                "prompt": "Which decimal equals 7%?",
                "type": "choice",
                "options": [
                  "0.7",
                  "0.07",
                  "0.007",
                  "7"
                ],
                "answer": 1,
                "hint": "Divide 7 by 100.",
                "steps": [
                  "7% = 0.07."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-meaning-3",
                "prompt": "Which fraction equals 25%?",
                "type": "choice",
                "options": [
                  "1/2",
                  "1/4",
                  "3/4",
                  "1/5"
                ],
                "answer": 1,
                "hint": "25/100 simplifies to 1/4.",
                "steps": [
                  "25% = 1/4."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-meaning-4",
                "prompt": "Convert 85% to a decimal.",
                "type": "number",
                "answer": 0.85,
                "hint": "Divide by 100.",
                "steps": [
                  "85% = 0.85."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0.0001,
                "xp": 10
              }
            ]
          },
          {
            "id": "pct-find",
            "title": "Finding a percentage",
            "pages": [
              {
                "title": "Convert then multiply",
                "body": "Turn the percentage into a decimal and multiply.",
                "example": "25% of 80 = 0.25 × 80 = 20."
              },
              {
                "title": "Use friendly fractions",
                "body": "Some percentages have simple fraction forms.",
                "example": "50% is one half; 10% is one tenth."
              },
              {
                "title": "Break percentages apart",
                "body": "Combine easy percentages.",
                "example": "15% = 10% + 5%."
              }
            ],
            "questions": [
              {
                "id": "pct-find-1",
                "prompt": "What is 25% of 80?",
                "type": "number",
                "answer": 20,
                "hint": "Use one quarter of 80.",
                "steps": [
                  "80 ÷ 4 = 20."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-find-2",
                "prompt": "What is 10% of 350?",
                "type": "number",
                "answer": 35,
                "hint": "Divide by 10.",
                "steps": [
                  "350 ÷ 10 = 35."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-find-3",
                "prompt": "What is 15% of 200?",
                "type": "number",
                "answer": 30,
                "hint": "Find 10% and 5%.",
                "steps": [
                  "20 + 10 = 30."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-find-4",
                "prompt": "What is 37% of 240?",
                "type": "number",
                "answer": 88.8,
                "hint": "Convert 37% to 0.37.",
                "steps": [
                  "0.37 × 240 = 88.8."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0.001,
                "xp": 10
              }
            ]
          },
          {
            "id": "pct-change",
            "title": "Percentage increase and decrease",
            "pages": [
              {
                "title": "Find the change",
                "body": "New value minus original value.",
                "example": "50 to 60 changes by 10."
              },
              {
                "title": "Divide by original",
                "body": "Percentage change = change ÷ original × 100.",
                "example": "10 ÷ 50 × 100 = 20%."
              },
              {
                "title": "Decrease uses the same method",
                "body": "Use the size of the drop divided by original.",
                "example": "80 to 60 is a 25% decrease."
              }
            ],
            "questions": [
              {
                "id": "pct-change-1",
                "prompt": "A price rises from 50 to 60. Percentage increase?",
                "type": "number",
                "answer": 20,
                "hint": "Change is 10; divide by 50.",
                "steps": [
                  "10 ÷ 50 × 100 = 20%."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-change-2",
                "prompt": "A value falls from 80 to 60. Percentage decrease?",
                "type": "number",
                "answer": 25,
                "hint": "Change is 20; divide by 80.",
                "steps": [
                  "20 ÷ 80 × 100 = 25%."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-change-3",
                "prompt": "A population rises from 200 to 250. Percentage increase?",
                "type": "number",
                "answer": 25,
                "hint": "Increase is 50.",
                "steps": [
                  "50 ÷ 200 × 100 = 25%."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-change-4",
                "prompt": "A score falls from 90 to 72. Percentage decrease?",
                "type": "number",
                "answer": 20,
                "hint": "Decrease is 18.",
                "steps": [
                  "18 ÷ 90 × 100 = 20%."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "pct-discount",
            "title": "Discounts and sale prices",
            "pages": [
              {
                "title": "Find the discount",
                "body": "Multiply original price by discount percentage.",
                "example": "$80 at 25% off gives a $20 discount."
              },
              {
                "title": "Subtract from original",
                "body": "Sale price = original − discount.",
                "example": "$80 − $20 = $60."
              },
              {
                "title": "Use a multiplier",
                "body": "A 20% discount means pay 80%, or multiply by 0.8.",
                "example": "$150 × 0.8 = $120."
              }
            ],
            "questions": [
              {
                "id": "pct-disc-1",
                "prompt": "An $80 item is 25% off. Sale price?",
                "type": "number",
                "answer": 60,
                "hint": "Find 25% of 80, then subtract.",
                "steps": [
                  "Discount = 20.",
                  "80 − 20 = 60."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-disc-2",
                "prompt": "A $150 item is 20% off. Sale price?",
                "type": "number",
                "answer": 120,
                "hint": "Pay 80% of the price.",
                "steps": [
                  "150 × 0.8 = 120."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-disc-3",
                "prompt": "A $45 item is 10% off. Sale price?",
                "type": "number",
                "answer": 40.5,
                "hint": "Find 10% and subtract.",
                "steps": [
                  "Discount = 4.5.",
                  "45 − 4.5 = 40.5."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0.001,
                "xp": 10
              },
              {
                "id": "pct-disc-4",
                "prompt": "A $240 item is 35% off. Sale price?",
                "type": "number",
                "answer": 156,
                "hint": "Pay 65% of the original.",
                "steps": [
                  "240 × 0.65 = 156."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "pct-word",
            "title": "Percentage applications",
            "pages": [
              {
                "title": "Tax and markups",
                "body": "Add a percentage of the original amount.",
                "example": "$100 plus 10% tax becomes $110."
              },
              {
                "title": "Tips",
                "body": "Tip = bill × tip rate.",
                "example": "$60 with 15% tip adds $9."
              },
              {
                "title": "Interest basics",
                "body": "Simple one-period interest is principal × rate.",
                "example": "$500 at 4% earns $20."
              }
            ],
            "questions": [
              {
                "id": "pct-word-1",
                "prompt": "A $100 purchase has 10% tax. Total cost?",
                "type": "number",
                "answer": 110,
                "hint": "Add 10% of 100.",
                "steps": [
                  "Tax = 10.",
                  "Total = 110."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-word-2",
                "prompt": "A $60 meal receives a 15% tip. Tip amount?",
                "type": "number",
                "answer": 9,
                "hint": "Multiply 60 by 0.15.",
                "steps": [
                  "60 × 0.15 = 9."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-word-3",
                "prompt": "$500 earns 4% simple interest for one period. Interest?",
                "type": "number",
                "answer": 20,
                "hint": "Multiply principal by rate.",
                "steps": [
                  "500 × 0.04 = 20."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pct-word-4",
                "prompt": "A battery is at 72% of 2500 mAh. Charge remaining?",
                "type": "number",
                "answer": 1800,
                "hint": "Multiply 2500 by 0.72.",
                "steps": [
                  "2500 × 0.72 = 1800."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "basic",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      }
    ]
  },
  "algebra": {
    "id": "algebra",
    "title": "Algebra Foundations",
    "icon": "𝑥",
    "color": "#1cb0f6",
    "description": "Variables, equations, expressions and graphs.",
    "topics": [
      {
        "id": "variables",
        "title": "Variables",
        "description": "Understand symbols and simplify expressions.",
        "icon": "𝑥",
        "prerequisite": null,
        "lessons": [
          {
            "id": "variables-intro",
            "title": "Variables and substitution",
            "pages": [
              {
                "title": "What is a variable?",
                "body": "A variable represents a value that may change or be unknown.",
                "example": "In x + 5, x is the variable."
              },
              {
                "title": "Substitution",
                "body": "Replace a variable with its known value.",
                "example": "If x = 3, then 2x + 1 = 7."
              },
              {
                "title": "Coefficients",
                "body": "A coefficient multiplies a variable.",
                "example": "In 4y, the coefficient is 4."
              }
            ],
            "questions": [
              {
                "id": "var-intro-1",
                "prompt": "If x = 4, what is x + 7?",
                "type": "number",
                "answer": 11,
                "hint": "Replace x with 4.",
                "steps": [
                  "4 + 7 = 11."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "var-intro-2",
                "prompt": "If y = 5, evaluate 3y.",
                "type": "number",
                "answer": 15,
                "hint": "3y means 3 × y.",
                "steps": [
                  "3 × 5 = 15."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "var-intro-3",
                "prompt": "What is the coefficient in 7a?",
                "type": "choice",
                "options": [
                  "a",
                  "7",
                  "0",
                  "1"
                ],
                "answer": 1,
                "hint": "The coefficient is the number multiplying the variable.",
                "steps": [
                  "The coefficient is 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "var-intro-4",
                "prompt": "If p = 6, evaluate 2p − 3.",
                "type": "number",
                "answer": 9,
                "hint": "Substitute p = 6.",
                "steps": [
                  "12 − 3 = 9."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "variables-like",
            "title": "Like terms and expressions",
            "pages": [
              {
                "title": "Terms",
                "body": "Terms are separated by addition or subtraction signs.",
                "example": "3x + 5 has two terms."
              },
              {
                "title": "Like terms",
                "body": "Like terms have matching variable parts.",
                "example": "3x and 2x are like terms."
              },
              {
                "title": "Combine coefficients",
                "body": "Add or subtract coefficients only.",
                "example": "3x + 2x = 5x."
              }
            ],
            "questions": [
              {
                "id": "var-like-1",
                "prompt": "Simplify 3x + 2x.",
                "type": "choice",
                "options": [
                  "5x",
                  "6x",
                  "5x²",
                  "x"
                ],
                "answer": 0,
                "hint": "Combine coefficients.",
                "steps": [
                  "3 + 2 = 5."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "var-like-2",
                "prompt": "Which pair contains like terms?",
                "type": "choice",
                "options": [
                  "3x and 4y",
                  "2x and 7x",
                  "x and x²",
                  "5 and 5x"
                ],
                "answer": 1,
                "hint": "Variable parts must match.",
                "steps": [
                  "2x and 7x are like terms."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "var-like-3",
                "prompt": "Simplify 8a − 3a.",
                "type": "choice",
                "options": [
                  "5",
                  "5a",
                  "11a",
                  "24a"
                ],
                "answer": 1,
                "hint": "Subtract coefficients.",
                "steps": [
                  "8a − 3a = 5a."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "var-like-4",
                "prompt": "Simplify 4x + 3 + 2x.",
                "type": "choice",
                "options": [
                  "6x + 3",
                  "9x",
                  "6x",
                  "4x + 5"
                ],
                "answer": 0,
                "hint": "Combine only x terms.",
                "steps": [
                  "4x + 2x = 6x, then keep +3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "one-step",
        "title": "One-step equations",
        "description": "Use inverse operations to solve equations.",
        "icon": "⚖️",
        "prerequisite": "variables",
        "lessons": [
          {
            "id": "one-step-add",
            "title": "Addition and subtraction equations",
            "pages": [
              {
                "title": "Keep equations balanced",
                "body": "Do the same operation to both sides.",
                "example": "x + 5 = 12 → x = 7."
              },
              {
                "title": "Use inverse operations",
                "body": "Subtraction reverses addition and addition reverses subtraction.",
                "example": "y − 8 = 10 → y = 18."
              },
              {
                "title": "Check by substitution",
                "body": "Put the answer back into the equation.",
                "example": "7 + 5 = 12."
              }
            ],
            "questions": [
              {
                "id": "eq1-add-1",
                "prompt": "Solve x + 5 = 12.",
                "type": "number",
                "answer": 7,
                "hint": "Subtract 5 from both sides.",
                "steps": [
                  "x = 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq1-add-2",
                "prompt": "Solve y − 8 = 10.",
                "type": "number",
                "answer": 18,
                "hint": "Add 8 to both sides.",
                "steps": [
                  "y = 18."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq1-add-3",
                "prompt": "Solve a + 17 = 30.",
                "type": "number",
                "answer": 13,
                "hint": "Subtract 17.",
                "steps": [
                  "a = 13."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq1-add-4",
                "prompt": "Solve b − 12 = 5.",
                "type": "number",
                "answer": 17,
                "hint": "Add 12.",
                "steps": [
                  "b = 17."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "one-step-mul",
            "title": "Multiplication and division equations",
            "pages": [
              {
                "title": "Undo multiplication",
                "body": "Divide both sides by the coefficient.",
                "example": "4x = 28 → x = 7."
              },
              {
                "title": "Undo division",
                "body": "Multiply both sides by the divisor.",
                "example": "x/6 = 5 → x = 30."
              },
              {
                "title": "Check",
                "body": "Substitute into the original.",
                "example": "4 × 7 = 28."
              }
            ],
            "questions": [
              {
                "id": "eq1-mul-1",
                "prompt": "Solve 4x = 28.",
                "type": "number",
                "answer": 7,
                "hint": "Divide by 4.",
                "steps": [
                  "x = 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq1-mul-2",
                "prompt": "Solve x/6 = 5.",
                "type": "number",
                "answer": 30,
                "hint": "Multiply by 6.",
                "steps": [
                  "x = 30."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq1-mul-3",
                "prompt": "Solve 9y = 81.",
                "type": "number",
                "answer": 9,
                "hint": "Divide by 9.",
                "steps": [
                  "y = 9."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq1-mul-4",
                "prompt": "Solve z/4 = 12.",
                "type": "number",
                "answer": 48,
                "hint": "Multiply by 4.",
                "steps": [
                  "z = 48."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "two-step",
        "title": "Two-step equations",
        "description": "Reverse two operations in the correct order.",
        "icon": "🧩",
        "prerequisite": "one-step",
        "lessons": [
          {
            "id": "two-step-basic",
            "title": "Solving two-step equations",
            "pages": [
              {
                "title": "Undo addition first",
                "body": "For ax + b = c, remove b before dividing by a.",
                "example": "2x + 6 = 20 → 2x = 14 → x = 7."
              },
              {
                "title": "One line at a time",
                "body": "Write one valid transformation per line.",
                "example": "3x − 9 = 0 → 3x = 9 → x = 3."
              },
              {
                "title": "Check the result",
                "body": "Substitute into the original equation.",
                "example": "2(7) + 6 = 20."
              }
            ],
            "questions": [
              {
                "id": "eq2-basic-1",
                "prompt": "Solve 2x + 6 = 20.",
                "type": "number",
                "answer": 7,
                "hint": "Subtract 6, then divide by 2.",
                "steps": [
                  "2x = 14.",
                  "x = 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq2-basic-2",
                "prompt": "Solve 3x − 9 = 0.",
                "type": "number",
                "answer": 3,
                "hint": "Add 9, then divide by 3.",
                "steps": [
                  "3x = 9.",
                  "x = 3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq2-basic-3",
                "prompt": "Solve 5x + 4 = 39.",
                "type": "number",
                "answer": 7,
                "hint": "Subtract 4, then divide by 5.",
                "steps": [
                  "5x = 35.",
                  "x = 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq2-basic-4",
                "prompt": "Solve 4x − 3 = 25.",
                "type": "number",
                "answer": 7,
                "hint": "Add 3, then divide by 4.",
                "steps": [
                  "4x = 28.",
                  "x = 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "two-step-fractions",
            "title": "Equations with division and negatives",
            "pages": [
              {
                "title": "Division forms",
                "body": "Multiply first when a variable expression is divided.",
                "example": "x/3 + 2 = 7 → x/3 = 5 → x = 15."
              },
              {
                "title": "Negative coefficients",
                "body": "Divide by the negative coefficient at the final step.",
                "example": "−2x + 4 = 10 → −2x = 6 → x = −3."
              },
              {
                "title": "Sign checks",
                "body": "Substitute to verify signs.",
                "example": "−2(−3) + 4 = 10."
              }
            ],
            "questions": [
              {
                "id": "eq2-frac-1",
                "prompt": "Solve x/3 + 2 = 7.",
                "type": "number",
                "answer": 15,
                "hint": "Subtract 2, then multiply by 3.",
                "steps": [
                  "x/3 = 5.",
                  "x = 15."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq2-frac-2",
                "prompt": "Solve −2x + 4 = 10.",
                "type": "number",
                "answer": -3,
                "hint": "Subtract 4, then divide by −2.",
                "steps": [
                  "−2x = 6.",
                  "x = −3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq2-frac-3",
                "prompt": "Solve x/5 − 1 = 3.",
                "type": "number",
                "answer": 20,
                "hint": "Add 1, then multiply by 5.",
                "steps": [
                  "x/5 = 4.",
                  "x = 20."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "eq2-frac-4",
                "prompt": "Solve −3x − 2 = 7.",
                "type": "number",
                "answer": -3,
                "hint": "Add 2, then divide by −3.",
                "steps": [
                  "−3x = 9.",
                  "x = −3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "expanding",
        "title": "Expanding brackets",
        "description": "Apply the distributive property.",
        "icon": "📦",
        "prerequisite": "two-step",
        "lessons": [
          {
            "id": "expand-positive",
            "title": "Positive multipliers",
            "pages": [
              {
                "title": "Distribute to every term",
                "body": "Multiply the outside value by each term inside.",
                "example": "3(x + 4) = 3x + 12."
              },
              {
                "title": "Keep variable terms",
                "body": "A number times x becomes a coefficient.",
                "example": "5(2x − 3) = 10x − 15."
              },
              {
                "title": "Combine after expanding",
                "body": "Then combine like terms if present.",
                "example": "2(x + 3) + x = 3x + 6."
              }
            ],
            "questions": [
              {
                "id": "exp-pos-1",
                "prompt": "Expand 3(x + 4).",
                "type": "choice",
                "options": [
                  "3x + 4",
                  "3x + 12",
                  "x + 12",
                  "7x"
                ],
                "answer": 1,
                "hint": "Multiply both terms by 3.",
                "steps": [
                  "3x + 12."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "exp-pos-2",
                "prompt": "Expand 5(2x − 3).",
                "type": "choice",
                "options": [
                  "10x − 3",
                  "10x − 15",
                  "7x − 8",
                  "10x + 15"
                ],
                "answer": 1,
                "hint": "Multiply 5 by both terms.",
                "steps": [
                  "10x − 15."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "exp-pos-3",
                "prompt": "Simplify 2(x + 3) + x.",
                "type": "choice",
                "options": [
                  "2x + 3",
                  "3x + 6",
                  "3x + 3",
                  "2x + 6"
                ],
                "answer": 1,
                "hint": "Expand then combine.",
                "steps": [
                  "2x + 6 + x = 3x + 6."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "exp-pos-4",
                "prompt": "Expand 4(3a + 2).",
                "type": "choice",
                "options": [
                  "12a + 2",
                  "7a + 6",
                  "12a + 8",
                  "4a + 8"
                ],
                "answer": 2,
                "hint": "Multiply each term by 4.",
                "steps": [
                  "12a + 8."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "expand-negative",
            "title": "Negative multipliers",
            "pages": [
              {
                "title": "Negative distribution",
                "body": "A negative multiplier changes signs.",
                "example": "−2(x − 5) = −2x + 10."
              },
              {
                "title": "Two negatives make positive",
                "body": "Negative times negative is positive.",
                "example": "−3(2x − 4) = −6x + 12."
              },
              {
                "title": "Check every term",
                "body": "Do not distribute to only the first term.",
                "example": "Each term must be multiplied."
              }
            ],
            "questions": [
              {
                "id": "exp-neg-1",
                "prompt": "Expand −2(x − 5).",
                "type": "choice",
                "options": [
                  "−2x − 10",
                  "−2x + 10",
                  "2x − 10",
                  "2x + 10"
                ],
                "answer": 1,
                "hint": "Multiply −2 by each term.",
                "steps": [
                  "−2x + 10."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "exp-neg-2",
                "prompt": "Expand −3(2x − 4).",
                "type": "choice",
                "options": [
                  "−6x − 12",
                  "−6x + 12",
                  "6x − 12",
                  "6x + 12"
                ],
                "answer": 1,
                "hint": "Negative times negative is positive.",
                "steps": [
                  "−6x + 12."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "exp-neg-3",
                "prompt": "Expand −(x + 7).",
                "type": "choice",
                "options": [
                  "−x + 7",
                  "x − 7",
                  "−x − 7",
                  "x + 7"
                ],
                "answer": 2,
                "hint": "Multiply every term by −1.",
                "steps": [
                  "−x − 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "exp-neg-4",
                "prompt": "Simplify 5x − 2(x + 3).",
                "type": "choice",
                "options": [
                  "3x − 6",
                  "7x + 6",
                  "3x + 6",
                  "7x − 6"
                ],
                "answer": 0,
                "hint": "Expand −2(x + 3).",
                "steps": [
                  "5x − 2x − 6 = 3x − 6."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "functions",
        "title": "Functions and graphs",
        "description": "Use input-output rules and explore graphs.",
        "icon": "📈",
        "prerequisite": "expanding",
        "lessons": [
          {
            "id": "functions-rule",
            "title": "Function rules",
            "pages": [
              {
                "title": "Inputs and outputs",
                "body": "A function maps each allowed input to one output.",
                "example": "f(x) = 2x + 1."
              },
              {
                "title": "Evaluate a function",
                "body": "Substitute the input value.",
                "example": "f(3) = 2(3) + 1 = 7."
              },
              {
                "title": "Tables",
                "body": "A value table helps reveal patterns.",
                "example": "For y = x + 2, outputs rise by 1 as x rises by 1."
              }
            ],
            "questions": [
              {
                "id": "func-rule-1",
                "prompt": "For f(x) = 2x + 1, find f(3).",
                "type": "number",
                "answer": 7,
                "hint": "Substitute x = 3.",
                "steps": [
                  "2(3) + 1 = 7."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "func-rule-2",
                "prompt": "For g(x) = x², find g(4).",
                "type": "number",
                "answer": 16,
                "hint": "Square 4.",
                "steps": [
                  "4² = 16."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "func-rule-3",
                "prompt": "For y = 3x − 2, which is the output when x = 5?",
                "type": "choice",
                "options": [
                  "13",
                  "15",
                  "17",
                  "8"
                ],
                "answer": 0,
                "hint": "Substitute 5.",
                "steps": [
                  "3(5) − 2 = 13."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "func-rule-4",
                "prompt": "For h(x) = x/2 + 4, find h(10).",
                "type": "number",
                "answer": 9,
                "hint": "Divide 10 by 2, then add 4.",
                "steps": [
                  "5 + 4 = 9."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "functions-graph",
            "title": "Graphing straight lines",
            "pages": [
              {
                "title": "Coordinates",
                "body": "Points are written (x, y).",
                "example": "(2, 5) means x = 2 and y = 5."
              },
              {
                "title": "Slope-intercept form",
                "body": "y = mx + b has slope m and y-intercept b.",
                "example": "y = 2x + 1 crosses at 1 and rises 2 for each step right."
              },
              {
                "title": "Use the graphing calculator",
                "body": "Enter an expression in x to view its shape.",
                "example": "Try 2*x+1 after unlocking graphing mode."
              }
            ],
            "questions": [
              {
                "id": "func-graph-1",
                "prompt": "In y = 2x + 3, what is the y-intercept?",
                "type": "choice",
                "options": [
                  "2",
                  "3",
                  "−3",
                  "5"
                ],
                "answer": 1,
                "hint": "The constant term is b.",
                "steps": [
                  "b = 3."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "func-graph-2",
                "prompt": "In y = −4x + 1, what is the slope?",
                "type": "choice",
                "options": [
                  "1",
                  "4",
                  "−4",
                  "−1"
                ],
                "answer": 2,
                "hint": "Slope is the coefficient of x.",
                "steps": [
                  "m = −4."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "func-graph-3",
                "prompt": "For y = 2x + 1, find y when x = 4.",
                "type": "number",
                "answer": 9,
                "hint": "Substitute x = 4.",
                "steps": [
                  "8 + 1 = 9."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "func-graph-4",
                "prompt": "Which equation has slope 3?",
                "type": "choice",
                "options": [
                  "y = 3x − 2",
                  "y = x + 3",
                  "y = −3x",
                  "y = 2x + 3"
                ],
                "answer": 0,
                "hint": "Slope is the x coefficient.",
                "steps": [
                  "y = 3x − 2."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "graphing",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      }
    ]
  },
  "geometry": {
    "id": "geometry",
    "title": "Geometry Essentials",
    "icon": "📐",
    "color": "#ce82ff",
    "description": "Measurement, angles and right triangles.",
    "topics": [
      {
        "id": "measurement",
        "title": "Perimeter and area",
        "description": "Measure boundaries and two-dimensional space.",
        "icon": "📏",
        "prerequisite": null,
        "lessons": [
          {
            "id": "perimeter",
            "title": "Perimeter",
            "pages": [
              {
                "title": "Distance around",
                "body": "Perimeter is the total length around a shape.",
                "example": "A 5 by 3 rectangle has perimeter 16."
              },
              {
                "title": "Rectangle formula",
                "body": "P = 2l + 2w.",
                "example": "2(5) + 2(3) = 16."
              },
              {
                "title": "Irregular shapes",
                "body": "Add every outside edge exactly once.",
                "example": "Keep units as length units."
              }
            ],
            "questions": [
              {
                "id": "peri-1",
                "prompt": "Rectangle 8 cm by 5 cm: perimeter?",
                "type": "number",
                "answer": 26,
                "hint": "Use 2l + 2w.",
                "steps": [
                  "16 + 10 = 26 cm."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "peri-2",
                "prompt": "Square side 6 cm: perimeter?",
                "type": "number",
                "answer": 24,
                "hint": "Multiply side by 4.",
                "steps": [
                  "4 × 6 = 24 cm."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "peri-3",
                "prompt": "Triangle sides 7, 9 and 10: perimeter?",
                "type": "number",
                "answer": 26,
                "hint": "Add all sides.",
                "steps": [
                  "7 + 9 + 10 = 26."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "peri-4",
                "prompt": "Which unit suits perimeter?",
                "type": "choice",
                "options": [
                  "cm",
                  "cm²",
                  "cm³",
                  "degrees"
                ],
                "answer": 0,
                "hint": "Perimeter is length.",
                "steps": [
                  "Use cm."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "area",
            "title": "Area",
            "pages": [
              {
                "title": "Space inside",
                "body": "Area measures two-dimensional space.",
                "example": "Rectangle area = length × width."
              },
              {
                "title": "Triangle area",
                "body": "A = 1/2 × base × height.",
                "example": "Base 10 and height 7 gives 35."
              },
              {
                "title": "Square units",
                "body": "Area uses units squared.",
                "example": "40 cm²."
              }
            ],
            "questions": [
              {
                "id": "area-1",
                "prompt": "Rectangle 8 cm by 5 cm: area?",
                "type": "number",
                "answer": 40,
                "hint": "Multiply length by width.",
                "steps": [
                  "8 × 5 = 40 cm²."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "area-2",
                "prompt": "Triangle base 10 and height 7: area?",
                "type": "number",
                "answer": 35,
                "hint": "Use one half base times height.",
                "steps": [
                  "1/2 × 10 × 7 = 35."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "area-3",
                "prompt": "Square side 9: area?",
                "type": "number",
                "answer": 81,
                "hint": "Square the side.",
                "steps": [
                  "9 × 9 = 81."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "area-4",
                "prompt": "Which unit suits area?",
                "type": "choice",
                "options": [
                  "cm",
                  "cm²",
                  "cm³",
                  "degrees"
                ],
                "answer": 1,
                "hint": "Area uses square units.",
                "steps": [
                  "Use cm²."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "angles",
        "title": "Angles",
        "description": "Recognise angle types and angle sums.",
        "icon": "📐",
        "prerequisite": "measurement",
        "lessons": [
          {
            "id": "angle-types",
            "title": "Angle types",
            "pages": [
              {
                "title": "Acute, right and obtuse",
                "body": "Acute < 90°, right = 90°, obtuse is between 90° and 180°.",
                "example": "120° is obtuse."
              },
              {
                "title": "Straight and reflex",
                "body": "Straight = 180°; reflex is between 180° and 360°.",
                "example": "270° is reflex."
              },
              {
                "title": "Estimate visually",
                "body": "Compare with a right angle.",
                "example": "This helps classify unfamiliar angles."
              }
            ],
            "questions": [
              {
                "id": "ang-type-1",
                "prompt": "What type is 120°?",
                "type": "choice",
                "options": [
                  "Acute",
                  "Right",
                  "Obtuse",
                  "Reflex"
                ],
                "answer": 2,
                "hint": "Compare with 90° and 180°.",
                "steps": [
                  "120° is obtuse."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "ang-type-2",
                "prompt": "What type is 45°?",
                "type": "choice",
                "options": [
                  "Acute",
                  "Right",
                  "Obtuse",
                  "Straight"
                ],
                "answer": 0,
                "hint": "45° is below 90°.",
                "steps": [
                  "Acute."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "ang-type-3",
                "prompt": "What type is 270°?",
                "type": "choice",
                "options": [
                  "Acute",
                  "Right",
                  "Obtuse",
                  "Reflex"
                ],
                "answer": 3,
                "hint": "It exceeds 180° but is below 360°.",
                "steps": [
                  "Reflex."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "ang-type-4",
                "prompt": "How many degrees in a right angle?",
                "type": "number",
                "answer": 90,
                "hint": "Recall the definition.",
                "steps": [
                  "90°."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "angle-sums",
            "title": "Angle sums",
            "pages": [
              {
                "title": "Straight line",
                "body": "Angles on a straight line total 180°.",
                "example": "70° + 110° = 180°."
              },
              {
                "title": "Around a point",
                "body": "Angles around a point total 360°.",
                "example": "90 + 100 + 170 = 360."
              },
              {
                "title": "Triangle sum",
                "body": "Angles in a triangle total 180°.",
                "example": "50 + 60 + 70 = 180."
              }
            ],
            "questions": [
              {
                "id": "ang-sum-1",
                "prompt": "One angle on a straight line is 65°. Find the other.",
                "type": "number",
                "answer": 115,
                "hint": "Subtract from 180.",
                "steps": [
                  "180 − 65 = 115°."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "ang-sum-2",
                "prompt": "Angles around a point total how many degrees?",
                "type": "number",
                "answer": 360,
                "hint": "Think full turn.",
                "steps": [
                  "360°."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "ang-sum-3",
                "prompt": "Triangle angles are 50° and 60°. Third angle?",
                "type": "number",
                "answer": 70,
                "hint": "Subtract from 180.",
                "steps": [
                  "180 − 110 = 70°."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "ang-sum-4",
                "prompt": "A quadrilateral has angles 90°, 80°, 100° and x. Find x.",
                "type": "number",
                "answer": 90,
                "hint": "Quadrilateral angles total 360°.",
                "steps": [
                  "360 − 270 = 90°."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      },
      {
        "id": "pythagoras",
        "title": "Pythagoras",
        "description": "Find missing sides in right triangles.",
        "icon": "🔺",
        "prerequisite": "angles",
        "lessons": [
          {
            "id": "pyth-hyp",
            "title": "Finding the hypotenuse",
            "pages": [
              {
                "title": "The theorem",
                "body": "For a right triangle, a² + b² = c².",
                "example": "3² + 4² = 5²."
              },
              {
                "title": "Identify c",
                "body": "c is opposite the right angle.",
                "example": "It is the longest side."
              },
              {
                "title": "Square root at the end",
                "body": "After adding squares, take the square root.",
                "example": "√25 = 5."
              }
            ],
            "questions": [
              {
                "id": "pyt-hyp-1",
                "prompt": "Shorter sides 3 and 4. Hypotenuse?",
                "type": "number",
                "answer": 5,
                "hint": "Use a² + b² = c².",
                "steps": [
                  "9 + 16 = 25.",
                  "√25 = 5."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "scientific",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pyt-hyp-2",
                "prompt": "Shorter sides 6 and 8. Hypotenuse?",
                "type": "number",
                "answer": 10,
                "hint": "Square, add and root.",
                "steps": [
                  "36 + 64 = 100.",
                  "√100 = 10."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "scientific",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pyt-hyp-3",
                "prompt": "Which side is c?",
                "type": "choice",
                "options": [
                  "Shortest",
                  "Hypotenuse",
                  "Any side",
                  "Vertical side"
                ],
                "answer": 1,
                "hint": "c is opposite the right angle.",
                "steps": [
                  "The hypotenuse."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pyt-hyp-4",
                "prompt": "Shorter sides 5 and 12. Hypotenuse?",
                "type": "number",
                "answer": 13,
                "hint": "Use the theorem.",
                "steps": [
                  "25 + 144 = 169.",
                  "√169 = 13."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "scientific",
                "tolerance": 0,
                "xp": 10
              }
            ]
          },
          {
            "id": "pyth-short",
            "title": "Finding a shorter side",
            "pages": [
              {
                "title": "Rearrange",
                "body": "a² = c² − b².",
                "example": "13² − 5² = 144."
              },
              {
                "title": "Subtract squares",
                "body": "Use the hypotenuse square minus the known shorter side square.",
                "example": "169 − 25 = 144."
              },
              {
                "title": "Take the square root",
                "body": "The missing positive length is √144 = 12.",
                "example": "Lengths are positive in this setting."
              }
            ],
            "questions": [
              {
                "id": "pyt-short-1",
                "prompt": "Hypotenuse 13, shorter side 5. Other side?",
                "type": "number",
                "answer": 12,
                "hint": "Subtract squares.",
                "steps": [
                  "169 − 25 = 144.",
                  "√144 = 12."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "scientific",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pyt-short-2",
                "prompt": "Hypotenuse 10, shorter side 6. Other side?",
                "type": "number",
                "answer": 8,
                "hint": "Use c² − b².",
                "steps": [
                  "100 − 36 = 64.",
                  "√64 = 8."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "scientific",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pyt-short-3",
                "prompt": "Hypotenuse 17, shorter side 8. Other side?",
                "type": "number",
                "answer": 15,
                "hint": "Subtract squares.",
                "steps": [
                  "289 − 64 = 225.",
                  "√225 = 15."
                ],
                "calculatorAllowed": true,
                "calculatorMode": "scientific",
                "tolerance": 0,
                "xp": 10
              },
              {
                "id": "pyt-short-4",
                "prompt": "Which expression finds a shorter side?",
                "type": "choice",
                "options": [
                  "√(a²+b²)",
                  "√(c²−b²)",
                  "c²+b²",
                  "c−b"
                ],
                "answer": 1,
                "hint": "Rearrange the theorem.",
                "steps": [
                  "√(c² − b²)."
                ],
                "calculatorAllowed": false,
                "calculatorMode": "none",
                "tolerance": 0,
                "xp": 10
              }
            ]
          }
        ]
      }
    ]
  }
};
