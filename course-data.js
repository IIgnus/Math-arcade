window.STEM_COURSES = {
  foundations: {
    id: 'foundations',
    title: 'Math Foundations',
    icon: '➕',
    color: '#58cc02',
    description: 'Build confidence with whole numbers and core operations.',
    topics: [
      topic(
  'addition',
  'Addition',
  'Add whole numbers using place value and mental strategies.',
  '➕',
  null,
  [
    lesson(
      'addition-meaning',
      'What addition means',
      [
        page(
          'Combining quantities',
          'Addition combines two or more quantities to find a total.',
          'If one basket has 3 apples and another has 4 apples, there are 3 + 4 = 7 apples altogether.'
        ),
        page(
          'The addition symbol',
          'The + symbol tells us to combine quantities. The = symbol shows that two expressions have the same value.',
          '5 + 2 = 7.'
        ),
        page(
          'Addition on a number line',
          'Start at the first number and move right by the second number.',
          'For 6 + 3, start at 6 and move three places right: 7, 8, 9.'
        )
      ],
      [
        num(
          'add-meaning-1',
          'What is 4 + 3?',
          7,
          'Start at 4 and count forward three places.',
          [
            '4 + 3 = 7.'
          ]
        ),
        num(
          'add-meaning-2',
          'What is 9 + 5?',
          14,
          'Count five places forward from 9.',
          [
            '9 + 5 = 14.'
          ]
        ),
        choice(
          'add-meaning-3',
          'Which expression represents six objects combined with four more?',
          [
            '6 − 4',
            '6 + 4',
            '6 ÷ 4',
            '6 × 4'
          ],
          1,
          'Combining quantities uses addition.',
          [
            '6 + 4 represents the combined total.'
          ]
        ),
        num(
          'add-meaning-4',
          'Lina has 7 pencils and receives 2 more. How many pencils does she have?',
          9,
          'Combine the original pencils and the new pencils.',
          [
            '7 + 2 = 9.'
          ]
        ),
        num(
          'add-meaning-5',
          'What is 13 + 6?',
          19,
          'Count forward six places.',
          [
            '13 + 6 = 19.'
          ]
        )
      ]
    ),

    lesson(
      'addition-place-value',
      'Adding with place value',
      [
        page(
          'Ones, tens and hundreds',
          'Digits have different values depending on their positions.',
          'In 243, the 2 represents 200, the 4 represents 40, and the 3 represents 3.'
        ),
        page(
          'Line up place values',
          'When adding vertically, place ones below ones and tens below tens.',
          'For 23 + 14, add 3 + 4 and then 2 tens + 1 ten.'
        ),
        page(
          'Add from right to left',
          'Begin with the smallest place value before moving left.',
          '23 + 14: 3 + 4 = 7, then 2 + 1 = 3, giving 37.'
        )
      ],
      [
        num(
          'add-place-1',
          'What is 23 + 14?',
          37,
          'Add the ones and then the tens.',
          [
            '3 + 4 = 7.',
            '2 tens + 1 ten = 3 tens.',
            'Answer: 37.'
          ]
        ),
        num(
          'add-place-2',
          'What is 42 + 35?',
          77,
          'Line up the ones and tens.',
          [
            '2 + 5 = 7.',
            '4 + 3 = 7.',
            'Answer: 77.'
          ]
        ),
        num(
          'add-place-3',
          'What is 126 + 243?',
          369,
          'Add ones, tens and hundreds separately.',
          [
            '6 + 3 = 9.',
            '2 + 4 = 6.',
            '1 + 2 = 3.',
            'Answer: 369.'
          ]
        ),
        choice(
          'add-place-4',
          'Which digits should be added first in 52 + 36?',
          [
            '5 and 3',
            '2 and 6',
            '5 and 6',
            '2 and 3'
          ],
          1,
          'Begin with the ones column.',
          [
            'The ones digits are 2 and 6.'
          ]
        ),
        num(
          'add-place-5',
          'A library has 135 science books and 242 maths books. How many books are there altogether?',
          377,
          'Add 135 and 242 by place value.',
          [
            '135 + 242 = 377.'
          ]
        )
      ]
    ),

    lesson(
      'addition-regrouping',
      'Regrouping when adding',
      [
        page(
          'When a column reaches ten',
          'Ten ones can be regrouped as one ten.',
          '8 + 7 = 15, which is 1 ten and 5 ones.'
        ),
        page(
          'Carry into the next column',
          'Write the ones digit and carry the new ten into the tens column.',
          '27 + 18: 7 + 8 = 15. Write 5 and carry 1 ten.'
        ),
        page(
          'Regroup more than once',
          'Larger calculations may require regrouping in several columns.',
          '368 + 457 requires regrouping from ones to tens and from tens to hundreds.'
        )
      ],
      [
        num(
          'add-regroup-1',
          'What is 27 + 18?',
          45,
          'Regroup 15 ones as 1 ten and 5 ones.',
          [
            '7 + 8 = 15.',
            'Write 5 and carry 1.',
            '2 + 1 + 1 = 4.',
            'Answer: 45.'
          ]
        ),
        num(
          'add-regroup-2',
          'What is 46 + 37?',
          83,
          'Add the ones and regroup.',
          [
            '6 + 7 = 13.',
            'Write 3 and carry 1.',
            '4 + 3 + 1 = 8.',
            'Answer: 83.'
          ]
        ),
        num(
          'add-regroup-3',
          'What is 158 + 267?',
          425,
          'Regroup from ones into tens.',
          [
            '8 + 7 = 15.',
            '5 + 6 + 1 = 12.',
            '1 + 2 + 1 = 4.',
            'Answer: 425.'
          ]
        ),
        num(
          'add-regroup-4',
          'What is 368 + 457?',
          825,
          'Regroup in both the ones and tens columns.',
          [
            '368 + 457 = 825.'
          ]
        ),
        num(
          'add-regroup-5',
          'A charity collected 286 cans on Monday and 175 on Tuesday. How many cans were collected?',
          461,
          'Add the two daily totals.',
          [
            '286 + 175 = 461.'
          ]
        )
      ]
    ),

    lesson(
      'addition-mental',
      'Mental addition strategies',
      [
        page(
          'Make ten',
          'Break apart a number so the first number reaches the next ten.',
          '8 + 7 = 8 + 2 + 5 = 15.'
        ),
        page(
          'Add tens and ones separately',
          'Split numbers into place-value parts.',
          '34 + 25 = 30 + 20 + 4 + 5 = 59.'
        ),
        page(
          'Compensation',
          'Round a number, calculate, then adjust.',
          '49 + 26 = 50 + 26 − 1 = 75.'
        )
      ],
      [
        num(
          'add-mental-1',
          'Use make-ten thinking to calculate 8 + 6.',
          14,
          'Move 2 from 6 to make 10 with 8.',
          [
            '8 + 2 + 4 = 14.'
          ]
        ),
        num(
          'add-mental-2',
          'What is 34 + 25?',
          59,
          'Add the tens and ones separately.',
          [
            '30 + 20 = 50.',
            '4 + 5 = 9.',
            '50 + 9 = 59.'
          ]
        ),
        num(
          'add-mental-3',
          'What is 49 + 26?',
          75,
          'Round 49 to 50 and subtract 1 afterwards.',
          [
            '50 + 26 − 1 = 75.'
          ]
        ),
        num(
          'add-mental-4',
          'What is 198 + 35?',
          233,
          'Round 198 to 200, then compensate.',
          [
            '200 + 35 − 2 = 233.'
          ]
        ),
        choice(
          'add-mental-5',
          'Which strategy makes 99 + 48 easiest?',
          [
            '100 + 48 − 1',
            '90 + 40 − 8',
            '99 − 48',
            '100 + 48 + 1'
          ],
          0,
          'Round 99 to 100 and compensate.',
          [
            '100 + 48 − 1 = 147.'
          ]
        )
      ]
    ),

    lesson(
      'addition-word-problems',
      'Addition word problems',
      [
        page(
          'Identify the quantities',
          'Read carefully and find which amounts are being combined.',
          'A class has 14 students and 12 more arrive. The quantities are 14 and 12.'
        ),
        page(
          'Choose the operation',
          'Words such as total, altogether and combined often indicate addition.',
          '14 + 12 finds the total number of students.'
        ),
        page(
          'Check the answer in context',
          'Ask whether your result makes sense for the situation.',
          'If two positive groups are combined, the total should be larger than either group.'
        )
      ],
      [
        num(
          'add-word-1',
          'A bus has 18 passengers. Seven more board. How many passengers are now on the bus?',
          25,
          'Combine the original passengers and the new passengers.',
          [
            '18 + 7 = 25.'
          ]
        ),
        num(
          'add-word-2',
          'A student reads 26 pages on Monday and 34 pages on Tuesday. How many pages were read altogether?',
          60,
          'Add both daily amounts.',
          [
            '26 + 34 = 60.'
          ]
        ),
        num(
          'add-word-3',
          'A science club has 47 batteries and receives 28 more. How many batteries does it have?',
          75,
          'The batteries are being combined.',
          [
            '47 + 28 = 75.'
          ]
        ),
        num(
          'add-word-4',
          'A game awards 125 points in one level and 240 in another. Find the total.',
          365,
          'Add both scores.',
          [
            '125 + 240 = 365.'
          ]
        ),
        choice(
          'add-word-5',
          'Which operation should be used to find a combined total?',
          [
            'Addition',
            'Subtraction',
            'Division',
            'Square root'
          ],
          0,
          'A combined total generally uses addition.',
          [
            'Addition combines quantities.'
          ]
        )
      ]
    )
  ]
),

      topic(
        'subtraction',
        'Subtraction',
        'Find differences and use borrowing.',
        '➖',
        'addition',
        [
          lesson(
            'subtraction-basics',
            'Subtracting whole numbers',
            [
              page(
                'What subtraction means',
                'Subtraction finds a difference or removes an amount.',
                '9 − 4 = 5.'
              ),
              page(
                'Regrouping',
                'When the top digit is smaller, regroup one unit from the next place.',
                '42 − 17: regroup 42 as 3 tens and 12 ones. 12 − 7 = 5, then 3 − 1 = 2, so the answer is 25.'
              ),
              page(
                'Check with addition',
                'Add your answer to the number subtracted.',
                '25 + 17 = 42, so 42 − 17 = 25 is correct.'
              )
            ],
            [
              num(
                'sub-1',
                'What is 15 − 7?',
                8,
                'Count up from 7 to 15.',
                ['15 − 7 = 8.']
              ),
              num(
                'sub-2',
                'What is 42 − 17?',
                25,
                'Regroup one ten.',
                [
                  '42 becomes 3 tens and 12 ones.',
                  '12 − 7 = 5.',
                  '3 − 1 = 2.',
                  'Answer: 25.'
                ]
              ),
              choice(
                'sub-3',
                'Which calculation checks that 63 − 28 = 35?',
                [
                  '35 + 28 = 63',
                  '63 + 28 = 91',
                  '35 − 28 = 7',
                  '28 − 35 = −7'
                ],
                0,
                'Use addition to reverse subtraction.',
                ['35 + 28 = 63.']
              ),
              num(
                'sub-4',
                'What is 500 − 176?',
                324,
                'Regroup carefully across the zeros.',
                ['500 − 176 = 324.']
              )
            ]
          )
        ]
      ),

      topic(
        'multiplication',
        'Multiplication',
        'Use groups, arrays, and place value.',
        '✖️',
        'subtraction',
        [
          lesson(
            'multiplication-basics',
            'Multiplication strategies',
            [
              page(
                'Equal groups',
                'Multiplication combines equal groups.',
                '4 × 3 means four groups of three, which equals 12.'
              ),
              page(
                'Break numbers apart',
                'Use the distributive property to split harder products.',
                '12 × 7 = (10 × 7) + (2 × 7) = 70 + 14 = 84.'
              ),
              page(
                'Estimate first',
                'Round one factor to check if your result is reasonable.',
                '19 × 6 is close to 20 × 6 = 120.'
              )
            ],
            [
              num(
                'mul-1',
                'What is 7 × 8?',
                56,
                'Use a known multiplication fact.',
                ['7 × 8 = 56.']
              ),
              num(
                'mul-2',
                'What is 12 × 7?',
                84,
                'Break 12 into 10 and 2.',
                [
                  '10 × 7 = 70.',
                  '2 × 7 = 14.',
                  '70 + 14 = 84.'
                ]
              ),
              choice(
                'mul-3',
                'Which expression equals 16 × 5?',
                [
                  '10 × 5 + 6 × 5',
                  '16 + 5',
                  '8 × 5',
                  '16 × 10'
                ],
                0,
                'Split 16 into 10 and 6.',
                [
                  '(10 × 5) + (6 × 5) = 50 + 30 = 80.'
                ]
              ),
              num(
                'mul-4',
                'What is 23 × 4?',
                92,
                'Multiply 20 and 3 separately.',
                [
                  '20 × 4 = 80.',
                  '3 × 4 = 12.',
                  '80 + 12 = 92.'
                ]
              )
            ]
          )
        ]
      ),

      topic(
        'division',
        'Division',
        'Share equally and reverse multiplication.',
        '➗',
        'multiplication',
        [
          lesson(
            'division-basics',
            'Understanding division',
            [
              page(
                'Equal sharing',
                'Division splits a quantity into equal groups.',
                '20 ÷ 5 = 4 because five groups of four make 20.'
              ),
              page(
                'Use multiplication facts',
                'Ask which number multiplied by the divisor gives the dividend.',
                '72 ÷ 8: since 8 × 9 = 72, the answer is 9.'
              ),
              page(
                'Remainders',
                'Some quantities cannot divide evenly.',
                '17 ÷ 5 = 3 remainder 2.'
              )
            ],
            [
              num(
                'div-1',
                'What is 72 ÷ 8?',
                9,
                'Think: 8 times what equals 72?',
                ['8 × 9 = 72, so 72 ÷ 8 = 9.']
              ),
              num(
                'div-2',
                'What is 96 ÷ 12?',
                8,
                'Use multiplication to reverse the operation.',
                ['12 × 8 = 96.']
              ),
              choice(
                'div-3',
                'What is 17 ÷ 5 as a quotient and remainder?',
                ['2 r7', '3 r2', '4 r1', '3 r5'],
                1,
                'Find the largest multiple of 5 below 17.',
                [
                  '5 × 3 = 15.',
                  '17 − 15 = 2.',
                  'Answer: 3 remainder 2.'
                ]
              ),
              num(
                'div-4',
                'What is 144 ÷ 12?',
                12,
                'This is a square multiplication fact.',
                ['12 × 12 = 144.']
              )
            ]
          )
        ]
      ),

      topic(
        'fractions',
        'Fractions',
        'Compare and calculate with parts of a whole.',
        '🍕',
        'division',
        [
          lesson(
            'fractions-basics',
            'Fraction foundations',
            [
              page(
                'Numerator and denominator',
                'The numerator counts selected parts. The denominator shows how many equal parts make a whole.',
                'In 3/4, three parts are selected out of four equal parts.'
              ),
              page(
                'Common denominators',
                'Fractions can be added directly when their denominators match.',
                '3/8 + 2/8 = 5/8.'
              ),
              page(
                'Equivalent fractions',
                'Multiply or divide numerator and denominator by the same nonzero number.',
                '1/2 = 2/4 = 4/8.'
              )
            ],
            [
              choice(
                'frac-1',
                'What is 3/8 + 2/8?',
                ['5/16', '5/8', '1/8', '6/8'],
                1,
                'The denominators already match.',
                [
                  'Add the numerators: 3 + 2 = 5.',
                  'Keep the denominator 8.',
                  'Answer: 5/8.'
                ]
              ),
              choice(
                'frac-2',
                'Which fraction is equivalent to 1/2?',
                ['2/3', '2/4', '3/5', '4/10'],
                1,
                'Multiply top and bottom by the same number.',
                ['1 × 2 / 2 × 2 = 2/4.']
              ),
              num(
                'frac-3',
                'What is one quarter of 28?',
                7,
                'Divide 28 by 4.',
                ['28 ÷ 4 = 7.']
              ),
              choice(
                'frac-4',
                'Which is larger?',
                ['2/3', '3/5', 'They are equal', 'Cannot tell'],
                0,
                'Compare using a common denominator or decimals.',
                [
                  '2/3 ≈ 0.667.',
                  '3/5 = 0.6.',
                  'Therefore 2/3 is larger.'
                ]
              )
            ]
          )
        ]
      ),

      topic(
        'percentages',
        'Percentages',
        'Connect percentages, fractions, and decimals.',
        '💯',
        'fractions',
        [
          lesson(
            'percentages-basics',
            'Working with percentages',
            [
              page(
                'Percent means out of 100',
                '35% means 35 out of every 100.',
                '35% = 35/100 = 0.35.'
              ),
              page(
                'Find a percentage',
                'Convert the percentage to a decimal, then multiply.',
                '25% of 80 = 0.25 × 80 = 20.'
              ),
              page(
                'Percentage change',
                'Change ÷ original × 100 gives percentage change.',
                'From 50 to 60: change is 10, so 10 ÷ 50 × 100 = 20%.'
              )
            ],
            [
              num(
                'pct-1',
                'What is 25% of 80?',
                20,
                'Convert 25% to 0.25.',
                [
                  '25% = 0.25.',
                  '0.25 × 80 = 20.'
                ],
                true
              ),
              num(
                'pct-2',
                'Convert 0.6 to a percentage.',
                60,
                'Multiply the decimal by 100.',
                ['0.6 × 100 = 60%.']
              ),
              choice(
                'pct-3',
                'Which decimal equals 7%?',
                ['0.7', '0.07', '0.007', '7.0'],
                1,
                'Divide the percentage by 100.',
                ['7 ÷ 100 = 0.07.']
              ),
              num(
                'pct-4',
                'A price rises from 50 to 60. What is the percentage increase?',
                20,
                'Find the increase, divide by the original, then multiply by 100.',
                [
                  'Increase = 10.',
                  '10 ÷ 50 = 0.2.',
                  '0.2 × 100 = 20%.'
                ],
                true
              )
            ]
          )
        ]
      )
    ]
  },

  algebra: {
    id: 'algebra',
    title: 'Algebra Foundations',
    icon: '𝑥',
    color: '#1cb0f6',
    description: 'Variables, expressions, equations, and patterns.',
    topics: [
      topic(
        'variables',
        'Variables',
        'Understand symbols that represent unknown values.',
        '𝑥',
        null,
        [
          lesson(
            'variables-basics',
            'Variables and expressions',
            [
              page(
                'What is a variable?',
                'A variable is a symbol representing a value that can change or may be unknown.',
                'In x + 5, x is the variable.'
              ),
              page(
                'Evaluate expressions',
                'Replace the variable with its value, then calculate.',
                'If x = 3, then 2x + 1 = 2(3) + 1 = 7.'
              ),
              page(
                'Like terms',
                'Terms with the same variable and power can be combined.',
                '3x + 2x = 5x.'
              )
            ],
            [
              num(
                'var-1',
                'If x = 4, what is x + 7?',
                11,
                'Replace x with 4.',
                ['4 + 7 = 11.']
              ),
              num(
                'var-2',
                'If y = 5, evaluate 3y.',
                15,
                '3y means 3 multiplied by y.',
                ['3 × 5 = 15.']
              ),
              choice(
                'var-3',
                'Simplify 3x + 2x.',
                ['5x', '6x', '5x²', 'x'],
                0,
                'Combine the coefficients.',
                ['3x + 2x = 5x.']
              ),
              choice(
                'var-4',
                'Which pair contains like terms?',
                [
                  '3x and 4y',
                  '2x and 7x',
                  'x and x²',
                  '5 and 5x'
                ],
                1,
                'Like terms have the same variables and powers.',
                ['2x and 7x are like terms.']
              )
            ]
          )
        ]
      ),

      topic(
        'one-step',
        'One-step equations',
        'Use inverse operations to solve equations.',
        '⚖️',
        'variables',
        [
          lesson(
            'one-step-basics',
            'Solving one-step equations',
            [
              page(
                'Keep equations balanced',
                'An equation stays true when you perform the same operation on both sides.',
                'x + 5 = 12. Subtract 5 from both sides to get x = 7.'
              ),
              page(
                'Inverse operations',
                'Addition reverses subtraction, and multiplication reverses division.',
                'x/4 = 6. Multiply both sides by 4 to get x = 24.'
              ),
              page(
                'Check by substitution',
                'Put your answer back into the original equation.',
                'For x = 7, 7 + 5 = 12, so the solution works.'
              )
            ],
            [
              num(
                'eq1-1',
                'Solve x + 5 = 12.',
                7,
                'Subtract 5 from both sides.',
                [
                  'x = 12 − 5.',
                  'x = 7.'
                ]
              ),
              num(
                'eq1-2',
                'Solve y − 8 = 10.',
                18,
                'Add 8 to both sides.',
                [
                  'y = 10 + 8.',
                  'y = 18.'
                ]
              ),
              num(
                'eq1-3',
                'Solve 4x = 28.',
                7,
                'Divide both sides by 4.',
                [
                  'x = 28 ÷ 4.',
                  'x = 7.'
                ]
              ),
              num(
                'eq1-4',
                'Solve x/6 = 5.',
                30,
                'Multiply both sides by 6.',
                [
                  'x = 5 × 6.',
                  'x = 30.'
                ]
              )
            ]
          )
        ]
      ),

      topic(
        'two-step',
        'Two-step equations',
        'Reverse two operations in the correct order.',
        '🧩',
        'one-step',
        [
          lesson(
            'two-step-basics',
            'Solving two-step equations',
            [
              page(
                'Undo addition first',
                'For ax + b = c, undo b before dividing by a.',
                '2x + 6 = 20 → 2x = 14 → x = 7.'
              ),
              page(
                'Work line by line',
                'Write one valid transformation per line to reduce mistakes.',
                '3x − 9 = 0 → 3x = 9 → x = 3.'
              ),
              page(
                'Check the solution',
                'Substitute the result into the original equation.',
                '2(7) + 6 = 20, so x = 7 is correct.'
              )
            ],
            [
              num(
                'eq2-1',
                'Solve 2x + 6 = 20.',
                7,
                'Subtract 6, then divide by 2.',
                [
                  '2x = 14.',
                  'x = 7.'
                ]
              ),
              num(
                'eq2-2',
                'Solve 3x − 9 = 0.',
                3,
                'Add 9, then divide by 3.',
                [
                  '3x = 9.',
                  'x = 3.'
                ]
              ),
              num(
                'eq2-3',
                'Solve 5x + 4 = 39.',
                7,
                'Subtract 4, then divide by 5.',
                [
                  '5x = 35.',
                  'x = 7.'
                ]
              ),
              num(
                'eq2-4',
                'Solve 4x − 3 = 25.',
                7,
                'Add 3, then divide by 4.',
                [
                  '4x = 28.',
                  'x = 7.'
                ]
              )
            ]
          )
        ]
      ),

      topic(
        'expanding',
        'Expanding brackets',
        'Apply the distributive property.',
        '📦',
        'two-step',
        [
          lesson(
            'expanding-basics',
            'Expanding expressions',
            [
              page(
                'Distribute to every term',
                'Multiply the value outside the bracket by every term inside.',
                '3(x + 4) = 3x + 12.'
              ),
              page(
                'Watch negative signs',
                'A negative multiplier changes each sign inside the bracket.',
                '−2(x − 5) = −2x + 10.'
              ),
              page(
                'Combine like terms',
                'After expanding, combine terms with matching variables and powers.',
                '2(x + 3) + x = 2x + 6 + x = 3x + 6.'
              )
            ],
            [
              choice(
                'exp-1',
                'Expand 3(x + 4).',
                ['3x + 4', '3x + 12', 'x + 12', '7x'],
                1,
                'Multiply both terms by 3.',
                [
                  '3 × x = 3x.',
                  '3 × 4 = 12.',
                  'Answer: 3x + 12.'
                ]
              ),
              choice(
                'exp-2',
                'Expand 5(2x − 3).',
                ['10x − 3', '10x − 15', '7x − 8', '10x + 15'],
                1,
                'Multiply 5 by both terms.',
                [
                  '5 × 2x = 10x.',
                  '5 × −3 = −15.'
                ]
              ),
              choice(
                'exp-3',
                'Expand −2(x − 5).',
                ['−2x − 10', '−2x + 10', '2x − 10', '2x + 10'],
                1,
                'Multiply −2 by each term.',
                [
                  '−2 × x = −2x.',
                  '−2 × −5 = +10.'
                ]
              ),
              choice(
                'exp-4',
                'Simplify 2(x + 3) + x.',
                ['2x + 3', '3x + 6', '3x + 3', '2x + 6'],
                1,
                'Expand first, then combine like terms.',
                ['2x + 6 + x = 3x + 6.']
              )
            ]
          )
        ]
      )
    ]
  },

  geometry: {
    id: 'geometry',
    title: 'Geometry Essentials',
    icon: '📐',
    color: '#ce82ff',
    description: 'Measurement, angles, area, and right triangles.',
    topics: [
      topic(
        'measurement',
        'Perimeter and area',
        'Measure the boundary and space inside shapes.',
        '📏',
        null,
        [
          lesson(
            'measurement-basics',
            'Perimeter and area',
            [
              page(
                'Perimeter',
                'Perimeter is the total distance around a shape.',
                'A 5 by 3 rectangle has perimeter 5 + 3 + 5 + 3 = 16.'
              ),
              page(
                'Area',
                'Area measures two-dimensional space.',
                'Rectangle area = length × width.'
              ),
              page(
                'Use square units',
                'Area is measured in units squared, such as cm².',
                'A rectangle 8 cm by 5 cm has area 40 cm².'
              )
            ],
            [
              num(
                'mea-1',
                'A rectangle is 8 cm by 5 cm. What is its area in cm²?',
                40,
                'Multiply length by width.',
                ['8 × 5 = 40 cm².']
              ),
              num(
                'mea-2',
                'A square has side length 6 cm. What is its perimeter?',
                24,
                'Add all four equal sides.',
                ['4 × 6 = 24 cm.']
              ),
              num(
                'mea-3',
                'A triangle has base 10 and height 7. What is its area?',
                35,
                'Use one half × base × height.',
                ['1/2 × 10 × 7 = 35.']
              ),
              choice(
                'mea-4',
                'Which unit is appropriate for area?',
                ['cm', 'cm²', 'cm³', 'degrees'],
                1,
                'Area uses square units.',
                ['The correct unit is cm².']
              )
            ]
          )
        ]
      ),

      topic(
        'angles',
        'Angles',
        'Recognise angle types and angle sums.',
        '📐',
        'measurement',
        [
          lesson(
            'angles-basics',
            'Angle relationships',
            [
              page(
                'Angle types',
                'Acute angles are below 90°, right angles equal 90°, and obtuse angles are between 90° and 180°.',
                'A 120° angle is obtuse.'
              ),
              page(
                'Straight lines',
                'Angles on a straight line total 180°.',
                'If one angle is 70°, the other is 110°.'
              ),
              page(
                'Around a point',
                'Angles around one point total 360°.',
                'Three angles 90°, 100°, and x give x = 170°.'
              )
            ],
            [
              choice(
                'ang-1',
                'What type of angle is 120°?',
                ['Acute', 'Right', 'Obtuse', 'Reflex'],
                2,
                'Compare with 90° and 180°.',
                [
                  '120° is greater than 90° and less than 180°, so it is obtuse.'
                ]
              ),
              num(
                'ang-2',
                'One angle on a straight line is 65°. What is the other angle?',
                115,
                'Subtract from 180°.',
                ['180 − 65 = 115°.']
              ),
              num(
                'ang-3',
                'Angles around a point total how many degrees?',
                360,
                'Think of a complete turn.',
                ['A full turn is 360°.']
              ),
              num(
                'ang-4',
                'Two angles in a triangle are 50° and 60°. Find the third angle.',
                70,
                'Triangle angles total 180°.',
                ['180 − 50 − 60 = 70°.']
              )
            ]
          )
        ]
      ),

      topic(
        'pythagoras',
        'Pythagoras',
        'Find missing sides in right triangles.',
        '🔺',
        'angles',
        [
          lesson(
            'pythagoras-basics',
            'The Pythagorean theorem',
            [
              page(
                'The relationship',
                'For a right triangle, a² + b² = c², where c is the hypotenuse.',
                'For sides 3 and 4: 3² + 4² = 9 + 16 = 25, so c = 5.'
              ),
              page(
                'Find a shorter side',
                'Rearrange to a² = c² − b².',
                'If c = 13 and b = 5, then a² = 169 − 25 = 144, so a = 12.'
              ),
              page(
                'Check the right angle',
                'The theorem applies only to right triangles.',
                'Always identify the side opposite the right angle as c.'
              )
            ],
            [
              num(
                'pyt-1',
                'A right triangle has shorter sides 3 and 4. Find the hypotenuse.',
                5,
                'Use a² + b² = c².',
                [
                  '3² + 4² = 25.',
                  '√25 = 5.'
                ],
                true
              ),
              num(
                'pyt-2',
                'A right triangle has hypotenuse 13 and one shorter side 5. Find the other side.',
                12,
                'Subtract the known square from the hypotenuse square.',
                [
                  '13² − 5² = 169 − 25 = 144.',
                  '√144 = 12.'
                ],
                true
              ),
              choice(
                'pyt-3',
                'Which side is c in a² + b² = c²?',
                [
                  'The shortest side',
                  'The hypotenuse',
                  'Any side',
                  'The vertical side'
                ],
                1,
                'c is opposite the right angle.',
                ['c is the hypotenuse.']
              ),
              num(
                'pyt-4',
                'A right triangle has shorter sides 6 and 8. Find the hypotenuse.',
                10,
                'Square both, add, then take the square root.',
                [
                  '36 + 64 = 100.',
                  '√100 = 10.'
                ],
                true
              )
            ]
          )
        ]
      )
    ]
  }
};

function topic(
  id,
  title,
  description,
  icon,
  prerequisite,
  lessons
) {
  return {
    id,
    title,
    description,
    icon,
    prerequisite,
    lessons
  };
}

function lesson(
  id,
  title,
  pages,
  questions
) {
  questions.forEach(question => {
    question.lessonId = id;
  });

  return {
    id,
    title,
    pages,
    questions
  };
}

function page(
  title,
  body,
  example
) {
  return {
    title,
    body,
    example
  };
}

function num(
  id,
  prompt,
  answer,
  hint,
  steps,
  calculator = false,
  tolerance = 0
) {
  return {
    id,
    prompt,
    type: 'number',
    answer,
    hint,
    steps,
    calculatorAllowed: calculator,
    tolerance,
    xp: 10
  };
}

function choice(
  id,
  prompt,
  options,
  answer,
  hint,
  steps,
  calculator = false
) {
  return {
    id,
    prompt,
    type: 'choice',
    options,
    answer,
    hint,
    steps,
    calculatorAllowed: calculator,
    tolerance: 0,
    xp: 10
  };
}
