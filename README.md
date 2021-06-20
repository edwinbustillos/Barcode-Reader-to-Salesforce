## APP BARCODE READER TO SALESFORCE
Barcode reader products and insert in SQLITE device to upload in custom Object in Salesforce with API APEX.

## Screens
![Alt Text](https://media.giphy.com/media/gkA9BN7UnoTyQkIJGf/giphy.gif)

## INSTALL DEPENDENCIES
```
yarn install
```

## RUN APP
```
yarn start
yarn android 
yarn ios
yarn web
```

## BUILD APP ANDROID
Build Docs: [https://docs.expo.io/distribution/building-standalone-apps/]: https://docs.expo.io/distribution/building-standalone-apps/
```
expo build:android -t apk
```


## CONFIG DATA ACCESS API SALESFORCE 
'/src/ListItem.js' config data access API Salesforce:
  - data.append('username', ' ')
  - data.append('password', ' ')
  - data.append('client_id', ' ')
  - data.append('client_secret', ' ')

Update API URL in '/src/ListItem.js' => https://your-host-salesforce-org/services/apexrest/AddProduct 

## EXAMPLE API APEX IN SALESFORCE TO UPLOAD BARCODE
```
@RestResource(urlMapping='/AddProduct/*')
global with sharing class apiAddProducts {
  @HttpPost
    global static String doPost(String name,String codeNumber,String quantity) {
        List<Product2> prodFind = [SELECT Id,ProductCode,Name,Stock__c FROM Product2 WHERE ProductCode =: codeNumber];
        if(!prodFind.isEmpty()) {  
        	Product2 product = new Product2();
         	product.Id = prodFind[0].Id;
          product.Name = prodFind[0].Name;
        	product.ProductCode = prodFind[0].ProductCode;
          product.Stock__c = (Decimal.valueOf(quantidade)+(prodFind[0].Stock__c));
        	upsert product product.Id;
        	return product.Id+' - Update';
        }else{
         	Product2 product = new Product2();
        	product.Name = name;
        	product.ProductCode = codigo;
          product.Stock__c = Decimal.valueOf(quantidade);
        	insert product;
        	return product.Id+' - Insert';
        }
    }
}
```

### Donations
![QRCodePaypalEdwinBustillos](https://user-images.githubusercontent.com/49764231/122661290-f4da2480-d15e-11eb-93bc-cc80c39e9483.png)
