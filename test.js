let invoer = `a;⠁
b;⠃
c;⠉
d;⠙
e;⠑
f;⠋
g;⠛
h;⠓
i;⠊
j;⠚
k;⠅
l;⠇
m;⠍
n;⠝
o;⠕
p;⠏
q;⠟
r;⠗
s;⠎
t;⠞
u;⠥
v;⠧
w;⠺
x;⠭
y;⠽
z;⠵
#;⠼
1;⠁
2;⠃
3;⠉
4;⠙
5;⠑
6;⠋
7;⠛
8;⠓
9;⠊
0;⠚
,;⠂
:;⠒
.;⠲
?;⠦
!;⠖
(;⠐⠣
);⠐⠜
/;⠸⠌
\;⠸⠡
-;⠤`


arr = invoer.split("\n");
res = ""
for (let zin of arr) {
    woorden = zin.split(";");
    //console.log(woorden);
    res += `"${woorden[0]}":"${woorden[1]}",`;
}
console.log(res);