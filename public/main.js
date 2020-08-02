
console.log('法外狂徒-张三')

// 点击按钮，获取css ,id可以直接添加点击事件
getCSS.onclick = () => {

    const request = new XMLHttpRequest();

    request.open('GET', "/style.css");

    request.onload = () => {
        console.log(request.response)
        // 创建style标签
        const style = document.createElement('style')

        // 把获取的css插入页面
        style.innerHTML = request.response
        document.head.appendChild(style)
    }
    request.onerror = () => {
        console.log('失败了');
    }

    request.send();
}

// 点击按钮，获取js
getJS.onclick = () => {
    // 第一步，创建一个请求对象
    const request = new XMLHttpRequest();
    // 第二步，设置请求方式和去哪请求的
    request.open('GET', '2.js');
    // 第三步，如果请求成功做什么失败做什么
    request.onload = () => {
        console.log('请求js成功');
        //创建script标签,request.response是请求到的内容（2.js里的内容）
        const script = document.createElement('script');
        script.innerHTML = request.response;
        document.body.appendChild(script)
    }
    request.onerror = () => {
        console.log('请求js失败');
    }
    //第四步，发送
    request.send();
}

//点击获取div,使用onreadystatechange代替onload和onerror
getHTML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '3.html');
    //onreadystatechange监控下载过程 
    request.onreadystatechange = () => {
        // 4是下载完成，但是不知道是成功2xx还是失败4xx 5xx
        if (request.readyState === 4) {
            //下载成功是成功2xx
            if (request.status >= 200 && request.status < 300) {
                console.log('下载HTML成功');
                const div = document.createElement('div');
                div.innerHTML = request.response;
                document.body.appendChild(div);
            } else {
                alert('加载失败');
            }
        }
    }
    request.send();
}

getXML.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '4.xml');
    request.onreadystatechange = () => {
        if (request.readyState === 4) {
            if (request.status >= 200 && request.status < 300) {
                //获取xml里的信息
                const dom = request.responseXML;
                const text = dom.getElementsByTagName('warning')
                [0].textContent.trim();
                console.log(text)

            }
        }
    };
    request.send();
}

getJSON.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', '5.json');
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            console.log(request.response)
            //JSON.parse将符合对象数据的字符串转化为对象
            const object = JSON.parse(request.response);
            //把名字显示到网页 myName是id名
            myName.textContent = object.name;
        }
    };
    request.send();
}
//分页
let n = 1;
getPage.onclick = () => {
    const request = new XMLHttpRequest();
    request.open('GET', `page${n + 1}`);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            //JSON.parse将符合对象数据的字符串转化为对象
            const array = JSON.parse(request.response);
            //遍历插入到ul里
            array.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.id;
                xxx.appendChild(li);
            });
            n = n + 1;

        }
    };
    request.send();
}