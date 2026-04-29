const DATA = {
  categories: [

    {
      name:"ثقافة",
      type:"question",
      questions:{
        easy:[
          {q:"عاصمة فرنسا؟",a:"باريس"},
          {q:"عاصمة اليابان؟",a:"طوكيو"}
        ],
        medium:[
          {q:"عدد الدول العربية؟",a:"22"}
        ],
        hard:[
          {q:"من اكتشف الجاذبية؟",a:"نيوتن"}
        ]
      }
    },

    {
      name:"تحدي الصور",
      type:"images",
      items:[
        {
          images:[
            "https://via.placeholder.com/100",
            "https://via.placeholder.com/100"
          ],
          answer:"سفر"
        }
      ]
    },

    {
      name:"التعديد",
      type:"multi",
      items:[
        {
          question:"اذكر أشهر الرياضات",
          answers:[
            {text:"كرة القدم",points:200},
            {text:"كرة السلة",points:150},
            {text:"التنس",points:100}
          ]
        }
      ]
    },

    {
      name:"حظ",
      type:"luck",
      items:[
        "+200 نقطة",
        "-100 نقطة",
        "سرقة دور",
        "تبديل النقاط"
      ]
    }

  ]
};
