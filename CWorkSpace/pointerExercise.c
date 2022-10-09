# include <stdlib.h>
# include <stdio.h>

void main()
{
    int a[]={1,2,5,3,8,9,6};
    int *p = a;
    printf("hello world!\n");
    printf("p的起始地址：%d\n",p);
    printf("*(p+1) = %d\n",*(p+1));
    printf("*(p+2) = %d\n",*(p+2));
    printf("*(p+3) = %d\n",*(p+3));
    printf("*p++ = %d\n",*p++);

    /*
*和++的优先级相同，运算顺序从右向左，所以*p++就相当于*(p++)；
这里存在一个知识误区：本应该先执行括号内的p++，使p从指向a[0]变成指向a[1]；
但其实事实并非如此；事实是，对于直接对*p++的输出来说，第一步是运算*p，输出后，第二步再运算p++；
需要注意的是：*和++对于p的运算，都是单独运算，比如第一步：*p就是对p所指向的地址进行取值，第二步：p++对于p所指向的地址+1个数据类型的字节数；


    printf("*p++ = %d\n",*p++)  等同于      printf("*p++ = %d\n",*p); (*p)++;
*/
    printf("*p++后的地址：%d\n",p);
    printf("*p的值是：%d\n",*p);
    printf("a[0]=%d\na[1]=%d\n",a[0],a[1]);
}