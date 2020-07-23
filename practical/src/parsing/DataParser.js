import React from 'react';

const Parser = (data) => {
    let history = [];
    for (i = 0; i < data.length; i++) {
        if(parseInt(data[i]) > -1) { // NaN is NOT greater than -1
            let item = data.splice(0, i);
            for(x = 0; x < data.length; x++) {
                if( !(parseInt(data[i]) > -1) ) { // Hit word again
                    let dValue = data.splice(0, x);
                }
            }
        }
        history = [...history, {name: item, value: dValue}];
      }
}