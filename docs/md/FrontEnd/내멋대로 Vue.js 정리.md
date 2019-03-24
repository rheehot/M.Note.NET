## 내멋대로 vue.js 정리하기

### 1. Component 내에서 자주쓰이는 부분들...

### .Vue

.vue 파일의 기본 구조는 template 태그 영역과 Script 태그 영역으로 이루어진다.

template

    //여기에는 vue 컴포넌트의 View에 해당하는 HTML DOM구조
/template

script
    
    //여기에는 vue 컴포넌트에 대한 정의
/script

### Vue Component 의 Script 에 정의되는..

많이 쓰는 순으로 일단 한번 써보자

data


<code>
    data(){
        return {
            sampleData : '샘플데이터';
        }
    }
</code>



Vue Component의 ViewModel 에 해당한다.(MVVM의 'VM')

해당 컴포넌트에서 사용되는 고유 데이터를 위한 선언영역

    Component 내 스크립트에서 불러올때는 보통 
    
    this.$data.sampleData
    
    template 에서 사용할때는 

    {{sampleData}}

