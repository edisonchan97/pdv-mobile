import React, { Component } from 'react';
export const Util = {
    //post请求
    post: function (url, data, callback) {
        const fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        fetch(url, fetchOptions)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
                // callback(responseText);
            }).done();
    },
    //get请求
    get: function (url, callback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                callback(JSON.parse(responseText));
                // callback(responseText);
            }).done();
    },

    log: function (obj) {
        var description = "";
        for (let i in obj) {
            let property = obj[i];
            description += i + " = " + property + "\n";
        }
        alert(description);
    },
    //Key
    key: 'HSHHSGSGGSTWSYWSYUSUWSHWBS-REACT-NATIVE'
};

