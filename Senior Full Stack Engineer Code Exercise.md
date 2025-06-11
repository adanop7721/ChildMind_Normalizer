## Introduction
Researchers often need to "normalize" the scores of their surveys for a certain population. Within a survey, each answer option is associated with a "raw score".  To "normalize" the score means they need to translate a "calculated raw score" to a "normalized score" by comparing calculations on raw scores to those of their peers based on age and sex. The configuration of this normalization process is called a "subscale". 

## Problem Description
For example, a calculated raw score might be 13, which might translate to a normalized score of 45 for an 18 year old male, but be a normalized score of 82 for a 13 year old female. 
Raw scores are simply a number that is associated with a particular answer in a single selection question - where a user can only choose one of the possible answers. For Question 1, answer options might be A = 1, B = 2, C = 3, D = 4.  Question 2, answer options might be A = 3, B = 1, C = 7, D = 10. The number of answer options and their and associated raw scores are arbitrary within reason.  Age is a number between 1 and 99. Sex is a single character either M or F.

"Calculated raw score" is the result of a calculation that has been performed on a group of raw scores. For the purpose of this exercise, assume the calculations are sum or average. A "Subscale" defines the configuration of the normalization process. It defines which subset of questions are used in the calculation as well as the calcuation type to be used.  

A very brief example of a normalization table:
Age,Sex,RawScore,NormalizedScore
18,M,13,45
18,M,12,50
13,F,13,82
13,F,12,80

To give a concrete example, let's assume a researcher has configured a subscale that uses the sum of raw scores from question 1 and 2 above. Although there are 7 total questions in this example survey - the other 5 are ignored. We have answers from a 13 year old female who answers question 1 with C and question 2 with D. Thus we have 3 + 10 = 13.  Our lookup table thus gives us a normalized score of 82.

## Your Task
Your task is to build a small react (or react native) app that:
* Enables the configuration of the subscale described above including two calculation types sum and average
* Simply displays the other inputs in a reasonably readable format
* Has a button to "calculate subscale" which should calculate and display the normalized score based on the configuration.

For clarity, the five inputs are the survey structure, the subscale configuration, the answers given by a particular user, the user's profile containing age and sex, and the normalization table.  

## Submission Format
You can submit this exercise in either typescript or python.
Please submit a zip or tarball of your code with everything needed to properly run it including a dependencies file (e.g. package.json, requirements.text, etc). Please include in your email any assumptions you've made, any pieces that are incomplete not working, and any other information you think we should know.
If you have questions, please contact Jody Brookover (jody.brookover@childmind.org). We really appreciate you taking the time to complete this exercise. We think this is a much more effective way of evaluating candidates, as opposed to a pressure filled live coding type of exercise.

