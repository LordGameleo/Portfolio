export interface WorkData {
    heading: string,
    org?: string,
    type?: string,
    startTime?: string,
    endTime?: string,
    isData: boolean,
    brief: string,
    descrition?: string,
    logoURL?: string,
    tools?: string,
}


export const WORK_DATA: WorkData[] = [
    {
        heading: 'Three.js',
        type: 'Fun',
        isData: false,
        startTime: '',
        endTime: '',
        brief: '',
        descrition: '',
        logoURL: '',
    },
    {
        heading: 'Teknofeet Marketplace System',
        org: 'Teknofeet',
        type: 'Work',
        isData: true,
        startTime: 'Nov 21',
        endTime: 'Present',
        brief: `Teknofeet envissioned itself as a marketplace, enabling brands to leverage their technology to reach to customer base and minimize the returns through online sale.
        <br>I designed the architecture, lead the software team which developed the system enabling the brands to seamlessly integrate with us directly or through Aggregators such as OMS Guru, Uniware, BrownTape, etc`,
        descrition: '',
        tools: 'Angular, NodeJS, Jest, Three.js, Nginx, ExpressJS, MySQL, Docker',
    },
    {
        heading: 'Teknofeet.com',
        org: 'Teknofeet',
        type: 'Work',
        isData: true,
        startTime: 'Nov 21',
        endTime: 'Present',
        brief: `Teknofeet is first Indian Footcommerce company to talk about fit according to volumental analysis of foot. 
        Teknofeet uses CV and ML to accurately generate a 3-D feet model and then recommends shoe after matching feet dimensions with footwear inner dimensions.
        <br><br>As the core member of Software Team at Teknofeet, I laid the foundation of <a href='https://teknofeet.com/'>www.teknofeet.com</a> `,
        descrition: '',
        logoURL: '',
        tools: 'Angular, NodeJS, Three.js, Nginx, ExpressJS, MySQL, Docker',
    },
    {
        heading: 'Warehouse Management System',
        org: 'Addverb Technologies',
        type: 'Work',
        isData: true,
        startTime: 'Jun 21',
        endTime: 'Oct 21',
        brief: `Addverb Technologies is India's only complete solution provider for warehouse automation. Addverb got $132M funding in 2021 from Reliance Industries.
        <br><br>I was responsible for development of a <span>highly configurable</span></b> Midbound Microservice. 
        It handles all the operations that happen once the SKU is inside a warehouse and accounted for.
        `,
        descrition: '',
        logoURL: '',
        tools: 'Angular, Spring, Kafka, SQL, Docker',
    },
    {
        heading: 'Single Sign On (SSO)',
        org: 'Addverb Technologies',
        type: 'Internship',
        isData: true,
        startTime: 'Aug 20',
        endTime: 'Jan 21',
        brief: `Addverb Technologies have many firms with multiple warehouse as their clients such as Pepsico, Flipkart, Reliance, ITC, Asian Paints, etc
        <br><br>Our team developed SSO which is as configurable as possible to reuse code and provide role based access to the user.
        We ended up creating a common platform for accessing all our systems at Addverb.`,
        descrition: '',
        logoURL: '',
        tools: 'Angular, Spring, Kafka, SQL, Docker',
    },
]