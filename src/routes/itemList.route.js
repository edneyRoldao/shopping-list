import express from 'express';
import tokenInterceptor from '../interceptors/checkToken.interceptor';
import objectIdValidator from '../validators/objectId.validator';
import dateFormatValidator from "../validators/dateFormat.validator";
import pagedSearchValidator from '../validators/pagedSearch.validator';
import itemListFilterValidator from '../validators/itemListFilter.validator';
import itemListCreateValidator from '../validators/itemListCreate.validator';
import itemListUpdateValidator from '../validators/itemListUpdate.validator';
import ItemListController from "../controllers/itemListController";

const router = express.Router();
const controller = new ItemListController();

router.post('/add',
            tokenInterceptor,
            objectIdValidator({name: 'userId'}, {name: 'listId'}),
            itemListCreateValidator(),
            controller.insertItemList);

router.get('/:itemListId',
            tokenInterceptor,
            objectIdValidator({name: 'itemListId'}, {name: 'userId'}),
            controller.getItemList);

router.get('/filter/:listId',
            tokenInterceptor,
            objectIdValidator({name: 'listId'}, {name: 'userId'}),
            dateFormatValidator({name: 'created', required: false}),
            itemListFilterValidator(),
            controller.getItemsList);

// todo - needs to be refactored
router.get('/paged/:listId',
            tokenInterceptor,
            objectIdValidator({name: 'listId'}, {name: 'userId'}),
            dateFormatValidator({name: 'created', required: false}),
            itemListFilterValidator(),
            pagedSearchValidator(),
            controller.getPagedItemsList);

router.put('/update/:itemListId',
            tokenInterceptor,
            objectIdValidator({name: 'itemListId'}, {name: 'listId', required: false}, {name: 'userId'}),
            itemListUpdateValidator(),
            controller.updateItemList);

router.delete('/delete/:itemListId',
            tokenInterceptor,
            objectIdValidator({name: 'itemListId'}, {name: 'userId'}),
            controller.removeItemList);

export default router;