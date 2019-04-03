# Algorithms Exercises
Code Challenge

## Instructions:

Exercise
Suppose you get a short input of increasing integers, say, "2 4", can you figure out what integers come after 4? If you assume the second integer is +2 greater than the first, then the next integer should be 6; but if you assume the second integer is double the first integer, then perhaps the next integer is 8. However, if the short input was "2 4 8", then you can almost be sure that the next integer is 16.

In short, the more numbers you get, the more hypotheses you can eliminate. We would like you to write a program, in Python, Javascript, Java or C#. Please clearly indicate which one you would like to use. The program takes in a short list of increasing integers as inputs, hypothesize possible patterns in the integers, and generate the next 10 integers in line.

For instance, if the program receives the following input: 
4 14

the program may assume that the next integer is the previous integer plus 10, thus it will generate:
24 34 44 54 64 74 84 94 104 114

but if the program receives the following input instead:
4 14 34

then it may hypothesize that the next integer is the previous multiplied by 2 plus 6.
74 154 3314 634 1274 2554 5114 10234 20474 40954

This is an open-ended problem that we're presenting, in other words, the input list of integers may have very interesting properties (e.g. a fibonacci sequence), there is no particular set of integer sequences that we are testing. So, be creative! try to identify as many sequences as you can think of.
You have three hours to work on this problem. When time is up, please zip and e-mail your source code to your interviewer


## Specifications and Rubric
 
You have to use one of the following: Python, Javascript, Java or C# The program should be compiled and run by simple commands like (for java):

javac MySolution.java
java MySolution

and require no additional configurations. 

After your program is launched, it should ask for user input from keyboard in the form of integers separated by spaces. (e.g. 2 4 6)

You will be evaluated on:

    • Correctness
    • Robustness
    • Algorithmic design
    • Coding style and organization

That's it, good luck!

-------
## Response

For run the program

go to root folder in terminal

```sh
$ npm install
$ npm run build -- [optional] this step overrides the current build
$ npm start
```
