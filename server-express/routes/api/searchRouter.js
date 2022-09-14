const searchRouter = require('express').Router();
const { Place, PlaceTag, PlaceImage } = require('../../db/models');

searchRouter.get('/', async (req, res) => {
  try {
    const { categories, tags } = req.query;

    const tagsFilter = (places) => {
      const tagsId = tags.split(' ').map((tagId) => Number(tagId));
      const placesByTags = places
        .filter(
          (place) => tagsId.every(
            (tagId) => place.PlaceTags
              .map(
                (placeTag) => placeTag.Tag.id,
              )
              .includes(tagId),
          ),
        );
      return placesByTags;
    };

    const getPlaces = async () => {
      const places = await Place.findAll({
        where: { isDeleted: false },
        order: [
          [PlaceImage, 'id', 'ASC'],
        ],
        include: [
          { model: PlaceImage },
          Place.Category,
          Place.Likes,
          Place.PlaceToGos,
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
          Place.Likes,
          Place.PlaceToGos,
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
        const placesByTags = tagsFilter(places);
        res.json({ data: placesByTags });
        return;
      }

      res.json({ data: places });
      return;
    }

    const categoriesId = categories.split(' ').map((categoryId) => Number(categoryId));
    const places = await getCategoryPlaces(categoriesId);

    if (tags !== 'all') {
      const placesByTags = tagsFilter(places);
      res.json({ data: placesByTags });
      return;
    }

    res.json({ data: places });
  } catch (error) {
    // console.log(error.message);
    res.json({ error: error.message });
  }
});

module.exports = searchRouter;
