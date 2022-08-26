#include <stdio.h>
#include <stdlib.h>
// 王道-数据结构-第三章 栈、队列和数组
    // 3.3.2 栈在表达式求值中的应用
        // 由中缀二叉树得到对应的中缀表达式
            // todo: 后缀表达式求值

typedef struct{
    char data;
    struct BnTree *left;
    struct BnTree *right;
}BnTree;

typedef struct{
    char data;
    struct stackNode *next;
}stackNode;

char pop(stackNode *s)
{
    stackNode *work=s->next;
    if(work->next!=NULL)
        s->next=work->next;
    else
        s->next=NULL;
    return work->data;
}

int push(stackNode *s, char c)
{
   
    if(NULL==s->next)
    {
        stackNode *work;
        work=(stackNode*)malloc(sizeof(stackNode));
        work->data=c;
        work->next=NULL;
        s->next=work;
        return 1;
    }
    else
    {
    
         stackNode *temp=(stackNode*)malloc(sizeof(stackNode));
         temp->data=c;
         temp->next=s->next;
         s->next=temp;

         return 1;
    }
    return 0;
}

int isEmpty(stackNode *s)
{
    if(s->next==NULL)
        return 1;
    return 0;
}

char getTop(stackNode *s)
{
    stackNode *temp=s->next;
    char c=temp->data;
    return c;
}
void compute(stackNode *s, char c)
{
    if(c=='+'||c=='-'||c=='*'||c=='/')
     {
        if(isEmpty(s))
            printf("(0");
        else if(getTop(s)!='(')
        {
            printf("(%c%c",pop(s),c);
            push(s,'(');
        }
  
     }
     else
     {
        if(NULL==s->next)
            {
                if(c=='+'||c=='-'||c=='*'||c=='/')
                    printf(" 0%c",c);
                
                stackNode *work;
                work=(stackNode*)malloc(sizeof(stackNode));
                work->data=c;
                work->next=NULL;
                s->next=work;
                return 1;
            }
            else
            {
            
                stackNode *temp=(stackNode*)malloc(sizeof(stackNode));
                temp->data=c;
                temp->next=s->next;
                s->next=temp;

                return 1;
            }
     }
}
void preOrder(BnTree* b,stackNode* stack)
{
    if(b->left!=NULL)
        preOrder(b->left,stack);

    //push(stack,b->data);
    compute(stack,b->data);
    // printf(" %c",b->data);
    // printf(" ");
    if(b->right!=NULL)
        preOrder(b->right,stack);

   
}


int main()
{

    BnTree *root,*s,*work;
    root=NULL;
    s=NULL;
    work=NULL;

    root=(BnTree*)malloc(sizeof(BnTree));
    root->data='-';
    root->left=NULL;
    root->right=NULL;
    work=root;

    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='+';
    work->left=s;
    work=s;
    s=NULL;

    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='A';
    work->left=s;
    s=NULL;

    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='*';
    work->right=s;
    work=s;
    s=NULL;
  
    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='B';
    work->left=s;
    s=NULL;

    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='-';
    work->right=s;
    work=s;
    s=NULL;
  
    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='C';
    work->left=s;
    s=NULL;

    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='D';
    work->right=s;

    work=root;
    s=NULL;

    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='/';
    work->right=s;
    work=s;
    s=NULL;

    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='E';
    work->left=s;
    s=NULL;

    s=(BnTree*)malloc(sizeof(BnTree));
    s->left=NULL;
    s->right=NULL;
    s->data='F';
    work->right=s;

    s=NULL;
    work=NULL;

    stackNode *stack=(stackNode*)malloc(sizeof(stackNode));
    stack->next=NULL;
    
    preOrder(root,stack);

    while(!isEmpty(stack))
    {
        char c=getTop(stack);
        if(c=='(')
        {
            printf(")");
            pop(stack);
        }

        else
            printf("%c",pop(stack));
    }

    printf("\n");

    printf("\n");



    
    system("pause");
    return 0;
}