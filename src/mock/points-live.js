const testPoints = [
  {
    id: '48a8aebe-44a7-4429-84c6-510aabb32d8d',
    basePrice: 1633,
    dateFrom: '2024-05-01T10:44:07.173Z',
    dateTo: '2024-05-02T19:09:07.173Z',
    destination: '2590497e-a7cc-4683-83d5-069d1803e134',
    isFavorite: true,
    offers: [],
    type: 'sightseeing',
  },
  {
    id: 'f9c98a78-dcc7-4acc-b3b9-b0e5e9b33b1a',
    basePrice: 8405,
    dateFrom: '2024-05-04T04:11:07.173Z',
    dateTo: '2024-05-05T16:39:07.173Z',
    destination: 'edf40082-a18e-4939-a668-608f3c478e7e',
    isFavorite: false,
    offers: [
      'c4d3712f-4aa4-4408-9dde-f64229508b3d',
      '4e0dba2a-1eed-4bbb-9572-370a00d5eeae',
      '0dcc727c-a915-451c-8f82-6a5782d12501',
      '09e96ffd-25fd-44d9-b80e-5340b4fa1f7c',
    ],
    type: 'taxi',
  },
  {
    id: '924ae215-aab4-4daa-bff8-8725e1826a59',
    basePrice: 3668,
    dateFrom: '2024-05-07T03:09:07.173Z',
    dateTo: '2024-05-08T18:05:07.173Z',
    destination: '4fe49c70-26f3-4128-ae1e-17076906f688',
    isFavorite: true,
    offers: ['5933f5a9-3321-4665-a8ae-163b1589859e'],
    type: 'bus',
  },
  {
    id: '4cdaab3c-831c-4480-aedb-697495e76a0b',
    basePrice: 5851,
    dateFrom: '2024-05-09T12:53:07.173Z',
    dateTo: '2024-05-10T07:49:07.173Z',
    destination: 'e28e2a3b-ff23-4aad-906e-abb63360518a',
    isFavorite: true,
    offers: [],
    type: 'drive',
  },
  {
    id: 'bf822a9d-880d-4a9c-afb1-b6fd0a4ea74a',
    basePrice: 1894,
    dateFrom: '2024-05-12T03:10:07.173Z',
    dateTo: '2024-05-13T09:09:07.173Z',
    destination: '02f9d5de-91e8-470b-ada4-d8a13a7bbc99',
    isFavorite: false,
    offers: ['5933f5a9-3321-4665-a8ae-163b1589859e'],
    type: 'bus',
  },
  {
    id: '847c7dcb-7367-4217-a9ff-5a8798e227ac',
    basePrice: 4429,
    dateFrom: '2024-05-14T07:27:07.173Z',
    dateTo: '2024-05-15T08:12:07.173Z',
    destination: 'f581f592-fec1-49a6-9274-45aa8af5a8f8',
    isFavorite: false,
    offers: ['9950fb39-3b9d-47b1-860c-9e0f06e0b19d'],
    type: 'restaurant',
  },
  {
    id: 'ce944773-4939-4bf9-a4ba-99ccaa5d44e7',
    basePrice: 7203,
    dateFrom: '2024-05-16T01:21:07.173Z',
    dateTo: '2024-05-17T19:40:07.173Z',
    destination: 'edf40082-a18e-4939-a668-608f3c478e7e',
    isFavorite: false,
    offers: ['c00501e7-75cf-4912-80a1-fdcc95b417bc', '9ff893f8-949e-4710-8a07-e19653f153fe'],
    type: 'drive',
  },
  {
    id: '357d1eb3-d65e-44eb-bebd-25b9b6121da7',
    basePrice: 8237,
    dateFrom: '2024-05-18T16:23:07.173Z',
    dateTo: '2024-05-20T15:15:07.173Z',
    destination: '02f9d5de-91e8-470b-ada4-d8a13a7bbc99',
    isFavorite: true,
    offers: [
      '09619671-d212-4fae-89d1-6162fc22cfc9',
      'a827dd3a-f3e4-4aa5-886a-6551dcc7c546',
      '814852e9-52ce-488d-88c4-a1e2f29797c1',
      'ac6a4e3f-0f59-4dfd-a106-354420c14e3f',
      '12b15448-3303-4cfc-a659-58beb3229b54',
      '22f3976c-5c18-4e4f-ae89-bd8097638f49',
    ],
    type: 'flight',
  },
  {
    id: '60d4df71-1aa7-4ea2-9e15-4b6b02a44f80',
    basePrice: 3093,
    dateFrom: '2024-05-22T11:20:07.173Z',
    dateTo: '2024-05-23T03:07:07.173Z',
    destination: 'e28e2a3b-ff23-4aad-906e-abb63360518a',
    isFavorite: true,
    offers: [
      '7c20ff9b-6b2e-4b5f-9c35-ee9b491ecf6d',
      'c8727734-3b90-4066-b155-778f224895ed',
      'cf90dc52-3ec7-47c0-9597-a5b7e2d4381b',
      'aa581e66-1715-4746-a9a2-311afd778c0f',
    ],
    type: 'check-in',
  },
  {
    id: 'c03bea4a-50c0-4127-87eb-a1d2b07eced8',
    basePrice: 7031,
    dateFrom: '2024-05-24T12:27:07.173Z',
    dateTo: '2024-05-25T11:13:07.173Z',
    destination: 'e28e2a3b-ff23-4aad-906e-abb63360518a',
    isFavorite: true,
    offers: [
      'be458fd2-a7df-4353-848f-bf936e9d0c2b',
      '7c20ff9b-6b2e-4b5f-9c35-ee9b491ecf6d',
      'c8727734-3b90-4066-b155-778f224895ed',
      'cf90dc52-3ec7-47c0-9597-a5b7e2d4381b',
      'aa581e66-1715-4746-a9a2-311afd778c0f',
    ],
    type: 'check-in',
  },
  {
    id: '374c5dd3-f1f4-4248-a929-398a50c2b51c',
    basePrice: 8049,
    dateFrom: '2024-05-27T00:34:07.173Z',
    dateTo: '2024-05-27T10:54:07.173Z',
    destination: '02f9d5de-91e8-470b-ada4-d8a13a7bbc99',
    isFavorite: false,
    offers: [
      '2193bc36-de91-4819-a4de-7383a121c013',
      'd59c9426-f6d5-44aa-a7fd-5907ac7c9d7a',
      '52aad8dc-8967-4572-b4c4-2dbc0149b861',
      '15906561-e275-43aa-99e6-1f8ffe3b9494',
    ],
    type: 'ship',
  },
  {
    id: 'b57044cb-951f-480a-aa46-b44e36ddc7fe',
    basePrice: 4219,
    dateFrom: '2024-05-29T10:46:07.173Z',
    dateTo: '2024-05-31T05:42:07.173Z',
    destination: 'edf40082-a18e-4939-a668-608f3c478e7e',
    isFavorite: true,
    offers: [],
    type: 'taxi',
  },
  {
    id: 'c52d6557-8d41-40f1-8354-acb48ac9a2ca',
    basePrice: 9674,
    dateFrom: '2024-06-01T14:47:07.173Z',
    dateTo: '2024-06-03T12:56:07.173Z',
    destination: '2590497e-a7cc-4683-83d5-069d1803e134',
    isFavorite: false,
    offers: ['254a3dd6-bb36-4e38-b5aa-ae2eade191e6', 'a68792a8-ae55-42a8-9b10-bf54059a0879', '5933f5a9-3321-4665-a8ae-163b1589859e'],
    type: 'bus',
  },
  {
    id: '7fef6560-ba6a-402e-8d90-3a8b0dee194a',
    basePrice: 5568,
    dateFrom: '2024-06-04T23:25:07.173Z',
    dateTo: '2024-06-05T10:19:07.173Z',
    destination: '9793894c-f912-4fcb-879e-1f21f91d5cca',
    isFavorite: true,
    offers: ['9ff893f8-949e-4710-8a07-e19653f153fe'],
    type: 'drive',
  },
  {
    id: 'eee4ce83-31e4-4595-a38d-c79ca362d7ab',
    basePrice: 9406,
    dateFrom: '2024-06-07T00:12:07.173Z',
    dateTo: '2024-06-09T00:26:07.173Z',
    destination: '2590497e-a7cc-4683-83d5-069d1803e134',
    isFavorite: true,
    offers: [],
    type: 'bus',
  },
  {
    id: 'ef422f10-ba65-470b-80aa-7c9b3c3f763c',
    basePrice: 8799,
    dateFrom: '2024-06-10T03:29:07.173Z',
    dateTo: '2024-06-12T03:10:07.173Z',
    destination: 'baedd0da-d74e-45ef-ad35-ee37057c3242',
    isFavorite: true,
    offers: ['c00501e7-75cf-4912-80a1-fdcc95b417bc', '9ff893f8-949e-4710-8a07-e19653f153fe'],
    type: 'drive',
  },
  {
    id: 'f6d410f7-acc7-400e-89a4-a4ac7cd638f4',
    basePrice: 2540,
    dateFrom: '2024-06-13T20:46:07.173Z',
    dateTo: '2024-06-15T06:03:07.173Z',
    destination: 'edf40082-a18e-4939-a668-608f3c478e7e',
    isFavorite: false,
    offers: ['efe7a4a2-5adb-46f4-9df7-48af15828a4f', '1c9316f4-3fc5-4472-8ee9-3bfb78ea021b'],
    type: 'train',
  },
  {
    id: 'a465b154-7354-409b-9ef0-53bfdeb1eb33',
    basePrice: 7081,
    dateFrom: '2024-06-15T18:01:07.173Z',
    dateTo: '2024-06-17T15:10:07.173Z',
    destination: '32affec0-beb8-441b-9c34-8ab3c982ac92',
    isFavorite: false,
    offers: ['c00501e7-75cf-4912-80a1-fdcc95b417bc', '9ff893f8-949e-4710-8a07-e19653f153fe'],
    type: 'drive',
  },
  {
    id: '15c044e4-99e6-47e8-ada0-6b391051d35f',
    basePrice: 4113,
    dateFrom: '2024-06-18T15:28:07.173Z',
    dateTo: '2024-06-19T03:16:07.173Z',
    destination: '2590497e-a7cc-4683-83d5-069d1803e134',
    isFavorite: false,
    offers: [
      '2193bc36-de91-4819-a4de-7383a121c013',
      'd59c9426-f6d5-44aa-a7fd-5907ac7c9d7a',
      '52aad8dc-8967-4572-b4c4-2dbc0149b861',
      '15906561-e275-43aa-99e6-1f8ffe3b9494',
    ],
    type: 'ship',
  },
  {
    id: 'a73c66ad-8f66-4b45-8dbf-18b1b1602d80',
    basePrice: 4591,
    dateFrom: '2024-06-19T23:54:07.173Z',
    dateTo: '2024-06-20T10:28:07.173Z',
    destination: '32affec0-beb8-441b-9c34-8ab3c982ac92',
    isFavorite: false,
    offers: [
      'be458fd2-a7df-4353-848f-bf936e9d0c2b',
      '7c20ff9b-6b2e-4b5f-9c35-ee9b491ecf6d',
      'c8727734-3b90-4066-b155-778f224895ed',
      'cf90dc52-3ec7-47c0-9597-a5b7e2d4381b',
      'aa581e66-1715-4746-a9a2-311afd778c0f',
    ],
    type: 'check-in',
  },
  {
    id: '4af41d16-ab1a-4b2a-b72d-e9604162f23e',
    basePrice: 2472,
    dateFrom: '2024-06-22T10:29:07.173Z',
    dateTo: '2024-06-22T23:31:07.173Z',
    destination: '4fe49c70-26f3-4128-ae1e-17076906f688',
    isFavorite: false,
    offers: [
      'a827dd3a-f3e4-4aa5-886a-6551dcc7c546',
      '814852e9-52ce-488d-88c4-a1e2f29797c1',
      'ac6a4e3f-0f59-4dfd-a106-354420c14e3f',
      '12b15448-3303-4cfc-a659-58beb3229b54',
      '22f3976c-5c18-4e4f-ae89-bd8097638f49',
    ],
    type: 'flight',
  },
  {
    id: '243fe184-e821-4700-a965-9bcea8dc898c',
    basePrice: 8313,
    dateFrom: '2024-06-24T08:28:07.173Z',
    dateTo: '2024-06-25T00:18:07.173Z',
    destination: 'e28e2a3b-ff23-4aad-906e-abb63360518a',
    isFavorite: false,
    offers: ['c00501e7-75cf-4912-80a1-fdcc95b417bc', '9ff893f8-949e-4710-8a07-e19653f153fe'],
    type: 'drive',
  },
  {
    id: '39dedf47-8343-4e8e-b471-38c001db908a',
    basePrice: 7117,
    dateFrom: '2024-06-26T07:36:07.173Z',
    dateTo: '2024-06-28T01:55:07.173Z',
    destination: 'edf40082-a18e-4939-a668-608f3c478e7e',
    isFavorite: true,
    offers: ['9ff893f8-949e-4710-8a07-e19653f153fe'],
    type: 'drive',
  },
  {
    id: 'da05b519-aa9f-4825-9a36-5f799a03d4a1',
    basePrice: 3380,
    dateFrom: '2024-06-29T18:42:07.173Z',
    dateTo: '2024-07-01T02:06:07.173Z',
    destination: '02f9d5de-91e8-470b-ada4-d8a13a7bbc99',
    isFavorite: true,
    offers: ['a68792a8-ae55-42a8-9b10-bf54059a0879', '5933f5a9-3321-4665-a8ae-163b1589859e'],
    type: 'bus',
  },
  {
    id: '24288e48-0be9-4ea8-acfb-494087315ad2',
    basePrice: 9480,
    dateFrom: '2024-07-02T15:05:07.173Z',
    dateTo: '2024-07-04T11:38:07.173Z',
    destination: 'edf40082-a18e-4939-a668-608f3c478e7e',
    isFavorite: true,
    offers: ['254a3dd6-bb36-4e38-b5aa-ae2eade191e6', 'a68792a8-ae55-42a8-9b10-bf54059a0879', '5933f5a9-3321-4665-a8ae-163b1589859e'],
    type: 'bus',
  },
];
export { testPoints };
