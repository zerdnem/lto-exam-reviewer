import {keyBy} from 'lodash';

import english from './lto-exam-reviewer-english';
import tagalog from './lto-exam-reviewer-tagalog';

import json from './Test Reviewer: English Test All.json';

import english1 from './Test Reviewer: English Test 1.json';
import english2 from './Test Reviewer: English Test 2.json';
import english3 from './Test Reviewer: English Test 3.json';
import english4 from './Test Reviewer: English Test 4.json';
import english5 from './Test Reviewer: English Test 5.json';
import english6 from './Test Reviewer: English Test 6';
import english7 from './Test Reviewer: English Test All';

import tagalog1 from './Test Reviewer: Tagalog Test 1.json';
import tagalog2 from './Test Reviewer: Tagalog Test 2.json';
import tagalog3 from './Test Reviewer: Tagalog Test 3.json';
import tagalog4 from './Test Reviewer: Tagalog Test 4.json';
import tagalog5 from './Test Reviewer: Tagalog Test 5.json';
import tagalog6 from './Test Reviewer: Tagalog Test 6';
import tagalog7 from './Test Reviewer: Tagalog Test All';

export function getListOfExams(language) {
  if (language === 1) {
    return new Promise((resolve, reject) => {
      resolve(english);
      reject('something went wrong!');
    });
  }
  if (language === 2) {
    return new Promise((resolve, reject) => {
      resolve(tagalog);
      reject('something went wrong!');
    });
  }
}

export function getNewExamData(examName) {
  switch (examName) {
    case 1:
      return new Promise((resolve, reject) => {
        resolve(keyBy(english1, line => line.id));
        reject('something went wrong!');
      });
      break;
    case 2:
      return new Promise((resolve, reject) => {
        resolve(keyBy(english2, line => line.id));
        reject('something went wrong!');
      });
      break;
      break;
    case 3:
      return new Promise((resolve, reject) => {
        resolve(keyBy(english3, line => line.id));
        reject('something went wrong!');
      });
      break;
    case 4:
      return new Promise((resolve, reject) => {
        resolve(keyBy(english4, line => line.id));
        reject('something went wrong!');
      });
      break;
    case 5:
      return new Promise((resolve, reject) => {
        resolve(keyBy(english5, line => line.id));
        reject('something went wrong!');
      });
      break;
    case 6:
      return new Promise((resolve, reject) => {
        resolve(keyBy(english6, line => line.id));
        reject('something went wrong!');
      });
      break;
    case 7:
      return new Promise((resolve, reject) => {
        resolve(keyBy(english7, line => line.id));
        reject('something went wrong!');
      });
      break;
    case 8:
      return new Promise((resolve, reject) => {
        resolve(keyBy(tagalog1, line => line.id));
        reject('something went wrong!');
      });
      break;
    case 9:
      return new Promise((resolve, reject) => {
        resolve(keyBy(tagalog2, line => line.id));
        reject("something went wrong!");
      });
      break;
    case 10:
      return new Promise((resolve, reject) => {
        resolve(keyBy(tagalog3, line => line.id));
        reject("something went wrong!");
      });
      break;
    case 11:
      return new Promise((resolve, reject) => {
        resolve(keyBy(tagalog4, line => line.id));
        reject("something went wrong!");
      });
      break;
    case 12:
      return new Promise((resolve, reject) => {
        resolve(keyBy(tagalog5, line => line.id));
        reject("something went wrong!");
      });
      break;
    case 13:
      return new Promise((resolve, reject) => {
        resolve(keyBy(tagalog6, line => line.id));
        reject("something went wrong!");
      });
      break;
    case 14:
      return new Promise((resolve, reject) => {
        resolve(keyBy(tagalog7, line => line.id));
        reject("something went wrong!");
      });
      break;

    default:
      return new Promise((resolve, reject) => {
        resolve(keyBy(json, line => line.id));
        reject('something went wrong!');
      });
  }
}
