// Write an example for each case '==' and '==='

var a = 1997;
var b = '1997';
var c = '1';
console.log( a == b); //true
console.log( a === b); //false
console.log( true == c); //true
console.log( true === c); //false


// map()
// + sẽ tạo ra một mảng mới với kết quả trả về của việc gọi hàm cho từng phần tử của mảng
// + gọi hàm được cung cấp 1 lần cho mỗi phần tử của mảng và theo thứ tự
// + nó sẽ không thực thi chức năng cho các phần tử trống
// + nó sẽ không làm thay đổi mảng ban đầu

var array = [4,9,16,25];
var newArray = array.map(Math.sqrt);
console.log(array); // [4,9,16,25]
console.log(newArray); // [2,3,4,5]

//filter()
// + sẽ tạo ra một mảng mới với tất các các phần tử thõa mãn được những yêu cầu bên trong hàm filter
// + sẽ không thực thi chức năng cho các phần tử trống
// + sẽ không làm thay đổi mảng ban đầu

var ages = [10, 20, 24, 9, 28];
var newAges = ages.filter((ages) => {
    return ages >= 20;
});
console.log(newAges); // [20,24,28]

//reduce()
// + sẽ trả về kết quả duy nhất là kết quả tích lũy của hàm
// + sẽ không thực thi đối với các phần tử mảng trống
// + sẽ không làm thay đổi mảng ban đầu.

var numbers = [10,20,30,40];
var newNumber = numbers.reduce((sum, num) => {
    return sum + num;
},0); //gán sum = 0
console.log(newNumber); // 100

// find()
// + sẽ kiểm tra lần lược từng phần tử của mảng, so sánh với điều kiện trong hàm và sẽ bỏ qua các phần tử
// còn lại nếu thõa mãn điều kiện và không so sánh tiếp.
// + sẽ không thực thi đối với các phần tử trống
// + sẽ không làm thay đổi mảng ban đầu

var scores = [6, 10, 3, 7, 9, 4];
var newScores = scores.find((scores) => {
    return scores <= 5;
});
console.log(newScores); // 3

// some()
// + Nếu một phần tử nào đó thỏa mãn điều kiện bên trong hàm, thì hàm sẽ trả về giá trị là true
// và sẽ không kiểm tra các giá trị còn lại, ngược lại nếu tất cả các giá trị không thõa mãn thì 
// hàm trả vê false.
// + sẽ không thực thi đối với các phần tử trống
// + sẽ không làm thay đổi mảng ban đầu
var arr = [10, 20, 24, 9, 28];
var newArr = arr.some((arr) => {
    return arr >= 20;
});
console.log(newArr); // true


// Give an example for add a new element to an array[] (at the end)

var mobile = ["SamSung","Sony","Apple","HTC","Nokia"];
mobile.push("Lumia","Lenovo"); // Hàm sẽ thêm 2 phần tử vào cuối mảng và trả về tổng số phần tử của mảng
console.log(mobile); // ["SamSung","Sony","Apple","HTC","Nokia","Lumia","Lenovo"]; 


// Give an example for add a new element to an array[] (at the beginning)
mobile.unshift("Xaomi"); // Hàm sẽ thêm 2 phần tử vào đầu mảng và trả về tổng số phần tử của mảng
console.log(mobile); //  ["Xaomi", "SamSung", "Sony", "Apple", "HTC", "Nokia", "Lumia", "Lenovo"] 

// Give an example for removing an element in array[]
//Xóa phần tử đầu tiên của mảng
mobile.shift();
console.log(mobile);//  ["SamSung", "Sony", "Apple", "HTC", "Nokia", "Lumia", "Lenovo"]

//xóa phần tử cuối cùng trong mảng
mobile.pop();
console.log(mobile);//  ["SamSung", "Sony", "Apple", "HTC", "Nokia", "Lumia"]

// Write a JavaScript program to compute the sum of the two given integers. If the two values are same, 
// then returns triple their sum.
function sumNumber(a,b) {
    if(a === b) {
        return (a + b) *3 ;
    } else {
        return a + b;
    }
}
console.log(sumNumber(10, 20)); // 30
console.log(sumNumber(10, 10)); //60

// Write a JavaScript program to compute the absolute difference between a specified number and 19. 
// Returns triple their absolute difference if the specified number is greater than 19.

function diff_num(x) {
    if (x <= 19) {
      return (19 - x);
      }
    else
      {
       return (x - 19) * 3;
      }
  }
  
  console.log(diff_num(12)); //7
  console.log(diff_num(19)); //0
  console.log(diff_num(22)); // 9

// A masked number is a string that consists of digits and one asterisk (*) that should be replaced  
// by exactly one digit. Given a masked number find all the possible options to replace the asterisk 
// with a digit to produce an integer divisible by 3.


function num(str) {
    let array1 = [];
    let array2 = str.split('').map(Number).filter(Boolean);
    let sum = 0;
    for(let item of array2) {
        if(item) {
          sum += item
        }
      }
    for(let i = 0; i < 10; i++) {
        if((sum + i) % 3 === 0) {
            array1.push(str.replace('*',i));
        }
    }
    return array1;
}
console.log(num('1*9'));
console.log(num('1234567890*'));

// A masked number is a string that consists of digits and one asterisk (*) that should be replaced 
// by exactly one digit. Given a masked number find all the possible options to replace the asterisk 
// with a digit to produce an integer divisible by 6.

function num2(str) {
    let array1 = [];
    let array2 = str.split('').map(Number).filter(Boolean);
    let kytu = str.slice(-1);
    let sum = 0;
    for(let item of array2) {
        if(item) {
          sum += item
        }
      }
    if (kytu % 2 === 0 && kytu !== '*'){
        for(let i = 0; i < 9; i++) {
            if((sum + i) % 3 === 0 ) {
                array1.push(str.replace('*',i));
            }
        }
    } else if(kytu == '*') {
        for(let i = 0; i < 5; i++) {
            if((sum + 2*i) % 3 === 0 ) {
                array1.push(str.replace('*',2*i));
            }
        }
    }
    return array1;
}
console.log(num2('1*9'));
console.log(num2('123456789*'));

