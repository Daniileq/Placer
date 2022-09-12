const searchRouter = require('express').Router();
const { Place, PlaceTag, PlaceImage } = require('../../db/models');

searchRouter.get('/', async (req, res) => {
  try {
    const { categories, tags } = req.query;

    const tagsFilter = (places) => {
      const tagsId = tags.split(' ').map((tagId) => Number(tagId));
      const filteredPlaces = places
        .filter(
          (place) => tagsId.every(
            (tagId) => place.PlaceTags
              .map(
                (placeTag) => placeTag.Tag.id,
              )
              .includes(tagId),
          ),
        );
      return filteredPlaces;
    };

    const getPlaces = async () => {
      const places = await Place.findAll({
        order: [
          [PlaceImage, 'id', 'ASC'],
        ],
        include: [
          { model: PlaceImage },
          Place.Category,
          {
            model: PlaceTag,
            include: PlaceTag.Tag,
          },
        ],
      });
      return places;
    };

    const getCategoryPlaces = async (categoriesId) => {
      const places = await Place.findAll({
        where: {
          categoryId: categoriesId,
        },
        order: [
          [PlaceImage, 'id', 'ASC'],
        ],
        include: [
          { model: PlaceImage },
          Place.Category,
          {
            model: PlaceTag,
            include: PlaceTag.Tag,
          },
        ],
      });
      return places;
    };

    if (categories === 'all') {
      const places = await getPlaces();

      if (tags !== 'all') {
        const filteredPlaces = tagsFilter(places);
        res.json({ data: filteredPlaces });
        return;
      }

      res.json({ data: places });
      return;
    }

    const categoriesId = categories.split(' ').map((categoryId) => Number(categoryId));
    const places = await getCategoryPlaces(categoriesId);

    if (tags !== 'all') {
      const filteredPlaces = tagsFilter(places);
      res.json({ data: filteredPlaces });
      return;
    }

    res.json({ data: places });
  } catch (error) {
    // console.log(error.message);
    res.json({ error: error.message });
  }
});

module.exports = searchRouter;
